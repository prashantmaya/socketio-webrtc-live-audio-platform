const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    phone_number: { type: String, required: true },
    activated: { type: Boolean, required: false, default: false },
  },
  {
    timestamps: true, //adds created_at and modified_at fields on the Schema.
  }
);

module.exports = mongoose.model("User", userSchema, "users");
// [ModelName, Schema, TableInDB]
