const { Schema, model } = require("mongoose");

const sellerToCustomerSchema = new Schema(
  {
    sellerId: { type: String, required: true },
    customerId: { type: Array, default: [] },
  },
  { timestamps: true }
);

module.exports = model("sellerChatCustomer", sellerToCustomerSchema);
