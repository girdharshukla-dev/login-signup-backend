# Node.js Authentication API

## Description

A simple authentication API built with Node.js, Express, MySQL, JWT, and bcrypt. This project handles user registration, login, logout, and route protection using JWT tokens stored in **HTTP-only cookies**.

## Features

- ✅ User Registration with hashed passwords
- ✅ User Login with JWT token generation
- ✅ JWT stored in **HTTP-only cookies** (not localStorage, safer)
- ✅ Auth middleware to protect routes
- ✅ User Logout (clears the cookie)

## How JWT + Cookies Work

- On login, a JWT token is generated and sent back to the client as an **HTTP-only cookie** named `jwtToken`.
- The cookie is **not accessible via JavaScript (HTTP-only)** — this prevents XSS attacks.
- On subsequent requests, the browser automatically sends this cookie.
- The server reads the cookie, verifies the JWT, and authenticates the user.
- Logout simply clears the `jwtToken` cookie from the browser.

## Tech Stack

- Node.js
- Express.js
- MySQL (mysql2)
- bcryptjs
- jsonwebtoken
- dotenv

## Installation

1. **Clone the repository**
```bash
git clone https://github.com/girdharshukla-dev/login-signup-backend.git
cd login-signup-backend
```
2. **Install dependencies**
```
npm install
```

3. **Set up environment variables**

Create a .env file in the root directory:
```
JWT_SECRET_KEY=your_secret_key_here
NODE_ENV=development
```

4. **Set up MySQL database**

- Create a database called testing or change it in dbConnection.js.
- The users table is automatically created if it does not exist.

```
CREATE DATABASE testing;
```

5. **Start the server**
```
node index.js
```

## API Endpoints

### POST api/user/register

#### Request Body :
```json
{
  "username": "john",
  "email": "john@example.com",
  "password": "password123"
}
```
#### Response :
```json
{ 
    "message": "User inserted", 
    "userID": <generated_id> 
}
```

### POST api/user/login

#### Request Body:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
#### Response:
```json
{
  "message": "Login success",
  "user": {
    "id": <id>,
    "email": "<email>"
  },
  "token": "<jwt_token>"
}
```
### POST api/user/logout


#### Response:
```json
{ 
    "message": "Logout successful" 
}
```
- Clears the cookie

### Protected route example: 
```
const { authMiddleware } = require("./middlewares/authMiddleware");

app.get("/api/dashboard", authMiddleware, (req, res) => {
    res.json({ message: `Welcome user ${req.user.email}` });
});
```
