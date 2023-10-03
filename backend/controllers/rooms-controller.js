const RoomDTO = require("../dtos/room-dto");
const roomService = require("../service/room-service");

class RoomsController {
  async create(req, res) {
    const { topic, roomType } = req.body;

    if (!topic || !roomType) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const room = await roomService.create({
      topic,
      roomType,
      ownerId: req.user._id,
    });

    if (!room) {
      return res
        .status(500)
        .json({ message: "Something went wrong, While creating the room." });
    }

    return res.json(new RoomDTO(room));
  }

  async index(req, res) {
    const rooms = await roomService.getAllRooms(["open", "social"]);
    const allRooms = rooms.map((room) => {
      return new RoomDTO(room);
    });
    return res.status(200).json(allRooms);
  }

  async show(req, res) {
    const roomId = req.params.roomId;
    const room = await roomService.getRoom(roomId);
    return res.status(200).json(room);
  }
}

module.exports = new RoomsController();
