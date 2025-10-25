const mongoose = require("mongoose");
const schema = mongoose.Schema;

const ProductSchema = new schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 0 },
    img: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    size: [{ type: Number, required: true }],
    color: [{ type: String, required: true }],
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema, "products");
