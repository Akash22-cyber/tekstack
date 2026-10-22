const express = require('express');
const usersRouter = require('./routes/users');

const app = express();
app.use(express.json());

// Middleware - Request Logger (before routes)
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url} - Request received`);
    next();
});

// Routes
app.use('/', usersRouter);

// Middleware - Final Logger (after route handling)
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url} - Response sent`);
    next();
});

// Server setup - port from environment variable or default 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
