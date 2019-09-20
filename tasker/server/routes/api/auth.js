const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

// Get auth

// Post auth
router.post('/register', (req, res) => {
    res.status(201).send({
        message: `${req.body.email} has been created with ${req.body.password} password!`
    });
});

module.exports = router;