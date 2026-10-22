const express = require('express');
const router = express.Router();

// In-memory users list with username, role, and last access date
const users = [
    { username: 'Alain',  role: 'admin',  lastAccess: new Date(Date.now() - 2  * 24 * 60 * 60 * 1000) },  // 2 days ago
    { username: 'Naima',  role: 'editor', lastAccess: new Date(Date.now() - 5  * 24 * 60 * 60 * 1000) },  // 5 days ago
    { username: 'Geetha', role: 'viewer', lastAccess: new Date(Date.now() - 8  * 24 * 60 * 60 * 1000) },  // 8 days ago
    { username: 'Ravi',   role: 'editor', lastAccess: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) },  // 15 days ago (excluded)
    { username: 'Priya',  role: 'viewer', lastAccess: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000) },  // 20 days ago (excluded)
];

// GET / - Return full details of users who accessed within the last 10 days
router.get('/', (req, res) => {
    const tenDaysAgo = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);

    const recentUsers = users.filter(user => new Date(user.lastAccess) >= tenDaysAgo);

    res.json({ users: recentUsers });
});

// GET /users - Return all users with full details
router.get('/users', (req, res) => {
    res.json({ users });
});

module.exports = router;
