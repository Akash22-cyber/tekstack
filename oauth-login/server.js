require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// ─────────────────────────────────────────────
// Session Middleware
// ─────────────────────────────────────────────
app.use(
  session({
    secret: process.env.SESSION_SECRET || "fallback_secret_change_me",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

// ─────────────────────────────────────────────
// Passport Initialization
// ─────────────────────────────────────────────
app.use(passport.initialize());
app.use(passport.session());

// ─────────────────────────────────────────────
// Google OAuth Strategy Configuration
// ─────────────────────────────────────────────
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // profile.displayName holds the user's Google name
      // In a real app, you'd find or create the user in a database here
      return done(null, profile);
    }
  )
);

// Serialize user into the session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from the session
passport.deserializeUser((user, done) => {
  done(null, user);
});

// ─────────────────────────────────────────────
// Middleware: Ensure User is Authenticated
// ─────────────────────────────────────────────
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

// ─────────────────────────────────────────────
// Routes
// ─────────────────────────────────────────────

// Home page — landing / login page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "home.html"));
});

// Trigger Google OAuth flow (scope: profile + email)
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback — handle success or failure
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/failure",
  }),
  (req, res) => {
    // Successful authentication → go to dashboard
    res.redirect("/dashboard");
  }
);

// Protected dashboard — only accessible when logged in
app.get("/dashboard", isAuthenticated, (req, res) => {
  const user = req.user;
  const displayName = user.displayName || "User";
  const email =
    user.emails && user.emails[0] ? user.emails[0].value : "N/A";
  const photo =
    user.photos && user.photos[0]
      ? user.photos[0].value
      : "https://ui-avatars.com/api/?name=" +
        encodeURIComponent(displayName) +
        "&background=4f46e5&color=fff&size=128";

  // Read the dashboard HTML and inject user data
  const fs = require("fs");
  let html = fs.readFileSync(
    path.join(__dirname, "views", "dashboard.html"),
    "utf-8"
  );
  html = html
    .replace(/{{displayName}}/g, displayName)
    .replace(/{{email}}/g, email)
    .replace(/{{photo}}/g, photo);

  res.send(html);
});

// Authentication failure page
app.get("/auth/failure", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "failure.html"));
});

// Logout route — destroy session and redirect home
app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.redirect("/");
    });
  });
});

// ─────────────────────────────────────────────
// Start Server
// ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀  Server running at http://localhost:${PORT}`);
  console.log(`📋  Home page    → http://localhost:${PORT}/`);
  console.log(`🔒  Dashboard    → http://localhost:${PORT}/dashboard`);
  console.log(`❌  Failure page → http://localhost:${PORT}/auth/failure\n`);
});
