const express = require('express');
const connectDB = require('./db');
const Product = require('./models/Product');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware to parse JSON request bodies
app.use(express.json());

// POST Route: Receive and store product data
app.post('/', async (req, res, next) => {
  try {
    const { productNo, productName, quantity, price } = req.body;
    const newProduct = new Product({
      productNo,
      productName,
      quantity,
      price
    });
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    next(err);
  }
});

// GET Route: Return all stored products
app.get('/allProducts', async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});

// 404 Middleware to manage unmatched paths
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// General Error-Handling Middleware (4 parameters)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error'
  });
});

// Start Express Server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { app, server };
