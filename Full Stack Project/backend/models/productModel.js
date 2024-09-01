const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    sellerId: { type: Schema.ObjectId, required: true },
    product: { type: String, required: true },
    slug: { type: String, require: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    description: { type: String, required: true },
    shopName: { type: String, required: true },
    images: { type: Array, require: true },
    rating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

productSchema.index(
  {
    name: "text",
    category: "text",
    brand: "text",
    description: "text",
  },
  {
    weights: {
      name: 5,
      category: 4,
      brand: 3,
      description: 2,
    },
  }
);

module.exports = model("products", productSchema);
