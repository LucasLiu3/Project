const { Schema, model } = require("mongoose");

const sellerWithdrawsSchema = new Schema(
  {
    sellerId: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true, default: "pending" },
  },
  { timestamps: true }
);

module.exports = model("sellerWithdraws", sellerWithdrawsSchema);
