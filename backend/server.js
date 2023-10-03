require("dotenv").config();
const express = require("express");
const app = express();
const DBConnect = require("./database");
const router = require("./routes");
const PORT = process.env.PORT || 5500;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const ACTIONS = require("./actions");
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost:3000"],
    method: ["GET", "POST"],
  },
});

app.use("/storage", express.static("storage"));

app.use(cookieParser());

const corsOption = {
  origin: ["http://localhost:3000"],
  credentials: true,
};
app.use(cors(corsOption));
app.use(express.json());

DBConnect();
app.use(router);

app.get("/", ({ req, res }) => {
  res.send("Hello World!");
});

//Socket

const socketUserMap = {};

io.on("connection", (socket) => {
  //Join Event.
  socket.on(ACTIONS.JOIN, ({ roomId, user }) => {
    socketUserMap[socket.id] = user;

    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);

    clients.forEach((clientId) => {
      io.to(clientId).emit(ACTIONS.ADD_PEER, {
        peerId: socket.id,
        createOffer: false,
        user,
      });

      socket.emit(ACTIONS.ADD_PEER, {
        peerId: clientId,
        createOffer: true,
        user: socketUserMap[clientId],
      });
    });

    // Join the room
    socket.join(roomId);
  });

  // Handle Relay Ice
  socket.on(ACTIONS.RELAY_ICE, ({ peerId, icecandidate }) => {
    io.to(peerId).emit(ACTIONS.ICE_CANDIDATE, {
      peerId: socket.id,
      icecandidate,
    });
  });

  // Handle Relay SDP.
  socket.on(ACTIONS.RELAY_SDP, ({ peerId, sessionDescription }) => {
    io.to(peerId).emit(ACTIONS.SESSION_DESCRIPTION, {
      peerId: socket.id,
      sessionDescription,
    });
  });

  //Handle Mute/Unmute

  async function handleMute({ roomId, userId }) {
    console.log(" HandleMute: ", userId);

    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
    clients.forEach((clientId) => {
      io.to(clientId).emit(ACTIONS.MUTE, {
        peerId: socket.id,
        userId,
      });
    });
  }
  async function handleUnMute({ roomId, userId }) {
    console.log(" HandleunMute: ", userId);

    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
    clients.forEach((clientId) => {
      io.to(clientId).emit(ACTIONS.UN_MUTE, {
        peerId: socket.id,
        userId,
      });
    });
  }
  socket.on(ACTIONS.MUTE, handleMute);
  socket.on(ACTIONS.UN_MUTE, handleUnMute);

  // Handle Leave Room

  const handleLeaveRoom = () => {
    const { rooms } = socket;
    Array.from(rooms).forEach((roomId) => {
      const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
      clients.forEach((clientId) => {
        io.to(clientId).emit(ACTIONS.REMOVE_PEER, {
          peerId: socket.id,
          userId: socketUserMap[socket.id]?.id,
        });

        socket.emit(ACTIONS.REMOVE_PEER, {
          peerId: clientId,
          userId: socketUserMap[clientId]?.id,
        });

        socket.leave(roomId);
      });
    });

    delete socketUserMap[socket.id];
  };

  socket.on(ACTIONS.LEAVE, handleLeaveRoom);
  socket.on("disconnecting", handleLeaveRoom);
});

server.listen(PORT, () => {
  console.log("Listening PORT: ", PORT);
});

/*
Notes -
* Established an SOCKET.IO Connection.

* Client emits a JOIN Event, We receive a roomId, User. Which room to JOIN, Which user wants to JOIN the room?
  -  If a new client comes, We add the new client to the client list of all the existing clients as a RTCPeerConnection. 
    The client who eastablises the connection creates the offer. and the client who joins the connection creates the answer.
    The amount of offer created depends upon the number of clients in a room.

* When there is a Relay-Ice or Relay-Sdp event on the socket. we send the sessionDesciption and icecandidate to the 
associated Peer.

* HandleRemovePeer - When this actions is triggered from the client. So first we remove that peer from all the available 
clients. and then we remove the current socket from that client too.


*/
