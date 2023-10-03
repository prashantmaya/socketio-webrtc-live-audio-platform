const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    phone_number: { type: String, required: true },
    name: { type: String, required: false },
    avatar: {
      type: String,
      required: false,
    },
    activated: { type: Boolean, required: false, default: false },
  },
  {
    timestamps: true, // adds created_at and modified_at fields on the Schema.
    toJSON: {
      getters: true, // Enable getters (including the 'avatar' getter) when converting to JSON.
      transform: function (doc, ret) {
        // Transform the 'avatar' field by appending the base URL.
        if (ret.avatar) {
          ret.avatar = `${process.env.BASE_URL}${ret.avatar}`;
        }
        delete ret._id; // Remove the '_id' field from the JSON output.
      },
    },
  }
);

module.exports = mongoose.model("User", userSchema, "users");
// [ModelName, Schema, TableInDB]
