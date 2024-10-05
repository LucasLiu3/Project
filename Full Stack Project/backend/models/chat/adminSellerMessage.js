const { Schema, model } = require("mongoose");

const adminSellerSchema = new Schema(
  {
    senderName: { type: String, required: true },
    senderId: { type: String, default: "" },
    receivewId: { type: String, default: "" },
    message: { type: String, required: true },
    status: { type: String, default: "unseen" },
  },
  { timestamps: true }
);

module.exports = model("admin_seller_messages", adminSellerSchema);
