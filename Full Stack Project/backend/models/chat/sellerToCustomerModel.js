const { Schema, model } = require("mongoose");

const sellerToCustomerSchema = new Schema(
  {
    myId: { type: String, required: true },
    othersId: { type: Array, default: [] },
  },
  { timestamps: true }
);

module.exports = model("sellerChatCustomer", sellerToCustomerSchema);
