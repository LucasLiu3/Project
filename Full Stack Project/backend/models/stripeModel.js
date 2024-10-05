const { Schema, model } = require("mongoose");

const stripeSchema = new Schema(
  {
    sellerId: { type: Schema.ObjectId, required: true },
    stripeId: { type: String, required: true, default: 0 },
    code: { type: String, require: true },
  },
  { timestamps: true }
);

module.exports = model("stripes", stripeSchema);
