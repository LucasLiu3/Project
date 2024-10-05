const { Schema, model } = require("mongoose");

const allPaymentsSchema = new Schema(
  {
    amount: { type: Number, required: true },
    month: { type: Number, required: true, default: 0 },
    year: { type: Number, require: true },
  },
  { timestamps: true }
);

module.exports = model("allPayments", allPaymentsSchema);
