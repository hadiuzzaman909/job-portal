const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

// JWT Authentication middleware
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(403).send('Access denied.');

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send('Invalid token.');
        req.user = user;
        next();
    });
};

module.exports = { authenticateJWT };
