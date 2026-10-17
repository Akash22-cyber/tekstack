# OAuth-Based Login with Google — Passport.js

A Node.js web application implementing **Google OAuth 2.0** authentication using **Passport.js** with the `passport-google-oauth20` strategy.

## Features

- 🔐 Google OAuth 2.0 login via Passport.js
- 🧩 Session-based authentication with `express-session`
- 🛡️ Protected routes using `isAuthenticated` middleware
- 👤 Personalized dashboard showing user's display name, email, and profile photo
- ❌ Dedicated failure page with error details
- 🚪 Secure logout with session destruction

## Project Structure

```
oauth-login/
├── server.js           # Main Express app with Passport strategy & routes
├── package.json        # Dependencies
├── .env.example        # Environment variables template
├── .gitignore
└── views/
    ├── home.html       # Landing page with "Login with Google" button
    ├── dashboard.html  # Personalized dashboard (name, photo, email)
    └── failure.html    # Authentication failure page
```

## Routes

| Route | Description |
|---|---|
| `GET /` | Home / login page |
| `GET /auth/google` | Starts Google OAuth flow |
| `GET /auth/google/callback` | OAuth callback from Google |
| `GET /dashboard` | Protected — shows user info |
| `GET /auth/failure` | Shown when login fails |
| `GET /logout` | Destroys session, redirects home |

## Setup & Run

### 1. Install dependencies
```bash
cd oauth-login
npm install
```

### 2. Configure Google OAuth credentials
- Go to [Google Cloud Console](https://console.cloud.google.com/)
- APIs & Services → Credentials → Create OAuth 2.0 Client ID
- Application type: **Web application**
- Authorized redirect URI: `http://localhost:3000/auth/google/callback`
- Copy the **Client ID** and **Client Secret**

### 3. Create `.env` file
```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SESSION_SECRET=any_long_random_string
PORT=3000
```

### 4. Start the server
```bash
node server.js
```

### 5. Visit the app
Open `http://localhost:3000` and click **Continue with Google** 🎉

## Technologies Used

- **Node.js** + **Express.js** — Backend framework
- **Passport.js** + `passport-google-oauth20` — OAuth strategy
- **express-session** — Session management
- **dotenv** — Environment variable loading
