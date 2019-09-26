const express = require('express');
const mongodb = require('mongodb');
const User = require('../../model/User');
const Joi = require('@hapi/joi');

const router = express.Router();

const schema = Joi.object({
  name: Joi.string()
    .min(6)
    .required(),
  email: Joi.string()
    .min(6)
    .required()
    .email(),
  password: Joi.string()
    .min(6)
    .required()
});

// Get auth

// Post auth
router.post('/register', async (req, res) => {

    // Validate data before making user
    try {
      const { error } = schema.validate(req.body);
      if (error) {
        res.status(400).send(error.details[0].message);
      }
    } catch(err) {
      res.send(err);
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