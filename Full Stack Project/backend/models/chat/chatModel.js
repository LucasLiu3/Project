const { Schema, model } = require("mongoose");

const chatSchema = new Schema(
  {
    myId: { type: String, required: true },
    othersId: { type: Array, default: [] },
  },
  { timestamps: true }
);

module.exports = model("chats", chatSchema);
