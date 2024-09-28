const { Schema, model } = require("mongoose");

const chatMessageSchema = new Schema(
  {
    senderName: { type: String, required: true },
    senderId: { type: String, required: true },
    receivewId: { type: String, required: true },
    messages: { type: String, required: true },
    status: { type: String, status: "unseen" },
  },
  { timestamps: true }
);

module.exports = model("chat_messages", chatMessageSchema);
