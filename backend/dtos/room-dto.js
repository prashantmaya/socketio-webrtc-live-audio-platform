class RoomDTO {
  id;
  topic;
  roomId;
  speakers;
  roomType;
  ownerId;
  createdAt;

  constructor(room) {
    this.id = room._id;
    this.topic = room.topic;
    this.speakers = room.speakers;
    this.roomType = room.roomType;
    this.ownerId = room.ownerId;
    this.createdAt = room.createdAt;
  }
}

module.exports = RoomDTO;
