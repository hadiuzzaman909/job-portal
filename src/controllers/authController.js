const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { ADMIN_USERNAME, ADMIN_PASSWORD, JWT_SECRET } = require('../config/config');

// Login to get JWT token
exports.login = (req, res) => {
    const { username, password } = req.body;

    if (username !== ADMIN_USERNAME) return res.status(400).json({ message: 'Invalid username' });

    // Compare the provided password with the stored hashed password
    bcrypt.compare(password, ADMIN_PASSWORD, (err, isMatch) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
};
