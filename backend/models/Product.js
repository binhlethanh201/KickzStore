const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ProductSchema = new schema(
  {
    name: { type: String, required: true },       
    description: { type: String },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 0 },
    img: { type: String },                          
    brand: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema, 'products');
