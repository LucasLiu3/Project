const { Schema, model } = require("mongoose");

const wishListSchema = new Schema(
  {
    customerId: { type: Schema.ObjectId, required: true },
    productId: { type: Schema.ObjectId, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
    rating: { type: Number, required: true },
    discount: { type: Number, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = model("wishLists", wishListSchema);
