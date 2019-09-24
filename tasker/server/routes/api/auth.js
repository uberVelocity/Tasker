const express = require('express');
const mongodb = require('mongodb');
const User = require('../../model/User');
const joi = require('@hapi/joi');

const router = express.Router();

const schema = {
  name: joi.string()
    .min(6)
    .required(),
  email: joi.string()
    .min(6)
    .required()
    .email(),
  password: joi.string()
    .min(6)
    .required()
};

// Get auth

// Post auth
router.post('/register', async (req, res) => {
    // Validate data before making user
    try {
      const result = await joi.valid(req.body, schema);
    } catch(error) {
      res.send(error.details[0].message);
    }
    
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
