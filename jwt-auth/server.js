require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Secret key for signing JWTs ───────────────────────────────────────────
const JWT_SECRET = process.env.JWT_SECRET || "streamflix_super_secret_key_2024";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

// ─── Middleware ─────────────────────────────────────────────────────────────
app.use(express.json());

// ─── In-memory user store (pre-hashed passwords) ────────────────────────────
// In production, store users in a database with bcrypt-hashed passwords.
// Passwords are hashed at startup for demonstration purposes.
const USERS = [
  {
    id: 1,
    username: "admin",
    // bcrypt hash of "password123"
    passwordHash: bcrypt.hashSync("password123", 10),
    role: "admin",
  },
  {
    id: 2,
    username: "john",
    // bcrypt hash of "john@456"
    passwordHash: bcrypt.hashSync("john@456", 10),
    role: "user",
  },
];

// ─── Movie catalog (protected content) ──────────────────────────────────────
const MOVIES = [
  { id: 1, title: "Interstellar",    genre: "Sci-Fi",   year: 2014, rating: 8.7 },
  { id: 2, title: "The Dark Knight", genre: "Action",   year: 2008, rating: 9.0 },
  { id: 3, title: "Inception",       genre: "Sci-Fi",   year: 2010, rating: 8.8 },
  { id: 4, title: "The Matrix",      genre: "Sci-Fi",   year: 1999, rating: 8.7 },
  { id: 5, title: "Parasite",        genre: "Thriller", year: 2019, rating: 8.5 },
  { id: 6, title: "Avengers: Endgame", genre: "Action", year: 2019, rating: 8.4 },
];

// ─────────────────────────────────────────────────────────────────────────────
// MIDDLEWARE: Verify JWT Token
// Checks the Authorization header for a Bearer token, verifies it,
// and attaches the decoded payload to req.user.
// ─────────────────────────────────────────────────────────────────────────────
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  // Check if Authorization header is present — 401 Unauthorized (no credentials provided)
  if (!authHeader) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  // Expect format: "Bearer <token>" — 401 for malformed/missing credentials
  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ message: "Invalid token format. Use: Bearer <token>" });
  }

  const token = parts[1];

  // Verify the token signature and expiry
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      // Expired token — 401: credentials exist but are no longer valid
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired. Please log in again." });
      }
      // Tampered / invalid signature — 401: credentials are unrecognized
      return res.status(401).json({ message: "Invalid token" });
    }

    // Attach decoded user info to the request
    req.user = decoded;
    next();
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// ROUTE: POST /login
// Accepts { username, password } in JSON body.
// Returns a signed JWT on valid credentials; 401 on failure.
// ─────────────────────────────────────────────────────────────────────────────
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Validate request body
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  // Find user by username
  const user = USERS.find((u) => u.username === username);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Compare submitted password with stored hash
  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Sign JWT with user payload
  const payload = {
    id: user.id,
    username: user.username,
    role: user.role,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  return res.status(200).json({
    message: "Login successful",
    token,
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// ROUTE: GET /movies  (PROTECTED)
// Returns the full movie catalog only to authenticated users.
// Requires: Authorization: Bearer <token>
// ─────────────────────────────────────────────────────────────────────────────
app.get("/movies", verifyToken, (req, res) => {
  // req.user is populated by verifyToken middleware
  return res.status(200).json(MOVIES);
});

// ─────────────────────────────────────────────────────────────────────────────
// ROUTE: GET /profile  (PROTECTED)
// Returns the authenticated user's profile info decoded from the JWT.
// ─────────────────────────────────────────────────────────────────────────────
app.get("/profile", verifyToken, (req, res) => {
  return res.status(200).json({
    message: `Welcome, ${req.user.username}!`,
    user: {
      id: req.user.id,
      username: req.user.username,
      role: req.user.role,
    },
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// ROUTE: GET /  — Health check / welcome
// ─────────────────────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.status(200).json({
    message: "🎬 StreamFlix API — JWT Protected",
    endpoints: {
      login:   "POST /login    — { username, password }",
      movies:  "GET  /movies   — Requires Bearer token",
      profile: "GET  /profile  — Requires Bearer token",
    },
    testCredentials: {
      admin: { username: "admin", password: "password123" },
      user:  { username: "john",  password: "john@456"    },
    },
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 404 — Unknown routes
// ─────────────────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ─────────────────────────────────────────────────────────────────────────────
// Start Server
// ─────────────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🎬  StreamFlix JWT API running at http://localhost:${PORT}`);
  console.log(`\n📋  Available endpoints:`);
  console.log(`    GET  http://localhost:${PORT}/         → API info`);
  console.log(`    POST http://localhost:${PORT}/login    → Get JWT token`);
  console.log(`    GET  http://localhost:${PORT}/movies   → Protected: movie list`);
  console.log(`    GET  http://localhost:${PORT}/profile  → Protected: user profile`);
  console.log(`\n🔑  Test credentials:`);
  console.log(`    username: admin  | password: password123`);
  console.log(`    username: john   | password: john@456\n`);
});
