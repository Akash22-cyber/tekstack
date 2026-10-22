const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// Hardcoded credentials and secret key
const HARDCODED_USER = { username: 'admin', password: 'password' };
const SECRET_KEY = 'mysecretkey';

// POST /login - Authenticate user and return JWT token
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === HARDCODED_USER.username && password === HARDCODED_USER.password) {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({ token });
    }

    return res.status(401).json({ message: 'Invalid username or password' });
});

// GET /protected - Protected route requiring valid JWT token
app.get('/protected', (req, res) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1]; // Bearer <token>

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        return res.json({ message: `Hello, ${decoded.username}!` });
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
});

// Server setup - port from environment variable or default 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
