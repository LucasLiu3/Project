const { Schema, model } = require("mongoose");

const customerOrderSchema = new Schema(
  {
    customerId: { type: Schema.ObjectId, required: true },
    product: { type: Array, required: true },
    price: { type: Number, require: true },
    payment_status: { type: String, required: true },
    shippingInfo: { type: Object, required: true },
    delivery_status: { type: String, required: true },
    data: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = model("customerOrders", customerOrderSchema);
