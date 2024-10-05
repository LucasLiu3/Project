const { Schema, model } = require("mongoose");

const sellerPaymentsSchema = new Schema(
  {
    sellerId: { type: String, required: true },
    amount: { type: Number, required: true },
    month: { type: Number, required: true, default: 0 },
    year: { type: Number, require: true },
  },
  { timestamps: true }
);

module.exports = model("sellerPayments", sellerPaymentsSchema);
