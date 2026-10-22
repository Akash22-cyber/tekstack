const express = require('express');
const carsRouter = require('./routes/cars');

const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());

// Routes
app.use('/', carsRouter);

// Server setup - port from environment variable
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
