const jwt = require('jsonwebtoken');

// Middleware for private routes
module.exports = function (req, res, next) {
    // Check if user has token
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send('Access Denied');
    }

    // Check if valid token
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch(err) {
        res.status(400).send('Invalid Token');
    }
};