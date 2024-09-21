const { Schema, model } = require("mongoose");

const adminOrderSchema = new Schema(
  {
    orderId: { type: Schema.ObjectId, required: true },
    sellerId: { type: Schema.ObjectId, required: true },
    product: { type: Array, required: true },
    price: { type: Number, require: true },
    payment_status: { type: String, required: true },
    shippingInfo: { type: String, required: true },
    delivery_status: { type: String, required: true },
    data: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = model("adminOrders", adminOrderSchema);
