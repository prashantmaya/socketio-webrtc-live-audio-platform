const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema(
  {
    topic: { type: String, required: true },
    roomType: { type: String, required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: "User" },
    speakers: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      required: false,
    },
  },
  {
    timestamps: true, //adds created_at and modified_at fields on the Schema.
  }
);

module.exports = mongoose.model("Room", roomSchema, "rooms");
// [ModelName, Schema, TableInDB]
