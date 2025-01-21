# Role-Based Login and Permission System

Welcome to the **Role-Based Login and Permission System** repository! This project is designed to help developers learn and implement a secure and efficient role-based authentication system for backend applications. With this guide, you'll understand how to define user roles and restrict access to resources based on permissions.

---

## Features

- Role-based user authentication.
- Dynamic middleware for access control.
- Easy integration with existing backend systems.
- Example implementation of JWT for secure token-based authentication.
- Modular and reusable code structure for scalability.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [How It Works](#how-it-works)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Example Code](#example-code)
6. [Contributing](#contributing)
7. [License](#license)

---

## Getting Started

To get started, clone this repository and follow the instructions below to set up and run the application.

```bash
# Clone the repository
git clone [https://github.com/lemonkhant/role-based-login.git](https://github.com/lemonkhant/RBAC.git)

# Navigate into the project directory
cd role-based-login

# Install dependencies
npm install
```

---

## How It Works

This system is designed around the principle of **role-based access control (RBAC)**. Each user is assigned a role, and resources are protected by middleware that checks the user’s role before granting access.

1. **Define Roles**: Specify roles such as `admin`, `moderator`, and `user` in your backend.
2. **Set Permissions**: Use middleware to restrict access to routes based on the user’s role.
3. **Authenticate Users**: Securely authenticate users using JWT and store their roles in the token payload.
4. **Authorize Requests**: Dynamically check the user’s role during each request.

---

## Installation

Follow these steps to set up the project:

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file in the root directory and configure the following:
   ```env
   JWT_SECRET=your_jwt_secret
   PORT=3000
   ```
4. Start the server:
   ```bash
   npm start
   ```

---

## Usage

Here’s how to define and use the role-based authorization middleware:

### 1. Define User Roles

Add roles to your user schema in the database:

```json
{
  "u_id": 1,
  "u_name": "John Doe",
  "u_password": "hashed_password",
  "role": "admin"
}
```

### 2. Create the Middleware

Use the provided `authorizeRoles` function:

```javascript
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access Denied" });
        }
        next();
    };
};

module.exports = authorizeRoles;
```

### 3. Protect Routes

Apply the middleware to restrict access based on roles:

```javascript
const express = require('express');
const authorizeRoles = require('./authorizeRoles');
const router = express.Router();

router.get('/admin', authorizeRoles('admin'), (req, res) => {
    res.send('Welcome, Admin!');
});

router.get('/moderator', authorizeRoles('moderator', 'admin'), (req, res) => {
    res.send('Hello, Moderator or Admin!');
});

module.exports = router;
```

---

## Example Code

### Login Endpoint

```javascript
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (!user) {
        return res.status(401).send('Invalid username or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).send('Invalid username or password');
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
});
```

---

## Contributing

We welcome contributions! Feel free to fork the repository, make changes, and submit a pull request.

---

## License

This project is licensed under the Min khant License.

Lincese is MIn khant

