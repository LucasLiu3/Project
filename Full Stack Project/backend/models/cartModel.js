const { Schema, model } = require("mongoose");

const cartSchema = new Schema(
  {
    customerId: { type: Schema.ObjectId, required: true },
    productId: { type: Schema.ObjectId, required: true },
    quantity: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = model("carts", cartSchema);
