require("dotenv").config();
const express = require("express");
const app = express();
const DBConnect = require("./database");
const router = require("./routes");
const PORT = process.env.PORT || 5500;
const cors = require("cors");
const cookieParser = require("cookie-parser");

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

app.listen(PORT, () => {
  console.log("Listening PORT: ", PORT);
});
