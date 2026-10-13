const mongoose = require('mongoose');

// Define Product Schema
const productSchema = new mongoose.Schema({
  productNo: {
    type: Number,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

// Compile Schema into Model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
