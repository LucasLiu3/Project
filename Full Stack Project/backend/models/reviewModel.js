const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    productId: { type: Schema.ObjectId, required: true },
    rating: { type: Number, required: true, default: 0 },
    review: { type: String, require: true },
    customerName: { type: String, required: true },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = model("reviews", reviewSchema);
