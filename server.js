const express = require('express');
const app = express();

// Configurable port (defaults to 3000)
const PORT = process.env.PORT || 3000;

// Mock user data with username, role, and last access date
const users = [
    // Active within the last 10 days
    { username: 'Alwin', role: 'admin', lastAccessDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) }, // 2 days ago
    { username: 'Veena', role: 'user', lastAccessDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },  // 5 days ago
    { username: 'Geetha', role: 'user', lastAccessDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000) }, // 8 days ago
    
    // Not active within the last 10 days (should be filtered out)
    { username: 'John', role: 'user', lastAccessDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000) }, // 12 days ago
    { username: 'Jane', role: 'admin', lastAccessDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) } // 15 days ago
];

// Middleware for request logging
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} request to ${req.url}`);
    next();
});

// Route to get users who accessed the system within the last 10 days
app.get('/', (req, res) => {
    // Calculate the date 10 days ago from right now
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

    // Filtering logic
    const activeUsers = users.filter(user => user.lastAccessDate >= tenDaysAgo);
    
    // Format output to match the required scenario (screenshot shows: "users: Alwin Veena Geetha")
    const usernames = activeUsers.map(user => user.username).join(' ');
    res.send(`users: ${usernames}`);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
