const express = require('express');
const morgan = require('morgan');
const logger = require('./logger');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON body
app.use(express.json());

// Custom middleware to log each incoming request method, URL, and timestamp
app.use((req, res, next) => {
  logger.info(`Incoming ${req.method} request at ${req.originalUrl || req.url} - ${new Date().toISOString()}`);
  next();
});

// Morgan HTTP request logging:
// - 'combined' format streamed to Winston (captured in console and app.log)
app.use(
  morgan('combined', {
    stream: {
      write: (message) => logger.info(message.trim())
    }
  })
);

// - 'tiny' format logged directly to console
app.use(morgan('tiny'));

// In-memory list of orders
let orders = [
  { customer: 'Alice', item: 'Apple', quantity: 5 },
  { customer: 'Bob', item: 'Banana', quantity: 3 }
];

// GET /orders - Fetch all orders
app.get('/orders', (req, res) => {
  logger.info('Fetched all orders');
  res.status(200).json(orders);
});

// POST /orders - Add a new order
app.post('/orders', (req, res) => {
  const { customer, item, quantity } = req.body;

  // Validate missing fields
  if (!customer || !item || !quantity) {
    logger.error('Invalid order: Missing fields.');
    return res.status(400).json({ error: 'Invalid order: Missing fields.' });
  }

  const newOrder = { customer, item, quantity };
  orders.push(newOrder);

  logger.info(`New order placed by ${customer} for ${quantity} ${item}`);
  res.status(201).json({
    message: 'Order placed successfully',
    order: newOrder
  });
});

// Start Express Server
const server = app.listen(PORT, () => {
  logger.info(`Order management server running on port ${PORT}`);
});

module.exports = { app, server, logger };
