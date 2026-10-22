const express = require('express');
const app = express();

app.use(express.json());

// In-memory users list with username, role, and last access date
const users = [
    { username: 'Alain',  role: 'admin',  lastAccess: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },   // 2 days ago
    { username: 'Naima',  role: 'editor', lastAccess: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },   // 5 days ago
    { username: 'Geetha', role: 'viewer', lastAccess: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000) },   // 8 days ago
    { username: 'Ravi',   role: 'editor', lastAccess: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) },  // 15 days ago (outside 10 days)
    { username: 'Priya',  role: 'viewer', lastAccess: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000) },  // 20 days ago (outside 10 days)
];

// Middleware - Request Logger
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
});

// GET / - Return users who accessed the system within the last 10 days
app.get('/', (req, res) => {
    const tenDaysAgo = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);

    const recentUsers = users.filter(user => new Date(user.lastAccess) >= tenDaysAgo);

    res.json({ users: recentUsers.map(u => u.username) });
});

// GET /users - Return all users with full details
app.get('/users', (req, res) => {
    res.json({ users });
});

// Server setup - port from environment variable or default 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
