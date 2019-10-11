const jwt = require('jsonwebtoken');

// Middleware for private routes
module.exports = function (req, res, next) {
    // Check if user has token
    const token = req.header('authorization');
    if (!token) {
        return res.status(401).send('Access Denied');
    }

    // Check if valid token
    try {
        const verified = jwt.verify(token, '124aww12423ad24124awdrtaeNADAIUASNFI@$h1247asd');
        req.user = verified;
        console.log('successfully verified user');
        next();
    } catch(err) {
        console.log('Invalid token');
        res.status(400).send('Invalid Token');
    }
};