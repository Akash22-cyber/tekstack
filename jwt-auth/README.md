# JWT Protected Routes — StreamFlix API

A Node.js REST API implementing **JWT (JSON Web Token)** authentication to protect premium movie content routes.

## How It Works

```
User → POST /login (credentials)
     ← 200 OK + JWT token

User → GET /movies  (Bearer token in header)
     ← 200 OK + movies list     (valid token)
     ← 403 Forbidden            (missing/invalid/expired token)
```

## Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| `GET`  | `/`        | ❌ None   | API info & test credentials |
| `POST` | `/login`   | ❌ None   | Login → returns JWT token   |
| `GET`  | `/movies`  | ✅ Bearer | Protected movie catalog     |
| `GET`  | `/profile` | ✅ Bearer | Logged-in user info         |

## Setup & Run

```bash
cd jwt-auth
npm install
node server.js
```

## Test with Postman

### 1. Login (valid credentials)
- **POST** `http://localhost:3000/login`
- Body (raw JSON):
```json
{ "username": "admin", "password": "password123" }
```
- Response: `{ "message": "Login successful", "token": "eyJ..." }`

### 2. Access protected route (with token)
- **GET** `http://localhost:3000/movies`
- Header: `Authorization: Bearer <paste token here>`
- Response: Array of movies ✅

### 3. Access without token
- **GET** `http://localhost:3000/movies` (no Authorization header)
- Response: `{ "message": "Invalid token" }` ❌ **403 Forbidden**

## Test Credentials

| Username | Password     | Role  |
|----------|-------------|-------|
| `admin`  | `password123` | admin |
| `john`   | `john@456`    | user  |

## Technologies

- **Express.js** — REST API framework
- **jsonwebtoken** — JWT sign & verify
- **bcryptjs** — Password hashing
- **dotenv** — Environment config
