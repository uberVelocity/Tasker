const express = require("express");
const User = require("../../model/User");
const { registerValidation, loginValidation } = require("../../validation");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');


// Post auth
router.post("/register", async (req, res) => {
  console.log('attempting to register user');

  // Validate data before making user
  const { error } = await registerValidation(req.body);

  if (error) {
      return res.json({
        err: error.details[0].message
      }).send();
  }

  // Check if user already in db
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    return res.status(400).send("Email already exists");
  }

  // Hash the password!
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });
  try {
    const savedUser = await user.save();
    console.log('saved user and sent it');
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  console.log('attempting to log in user');

  // Validate user
  const { error } = await loginValidation(req.body);
  if (error) {
    return res.json({
      err: error.details[0].message
    }).send();
  }

  // Check if email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.json({
      err: 'invalid email'
    }).send();
  }

  // Check if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res.json({
      err: 'invalid password'
    }).send();
  }

  // Create and assign a JSON Web Token (string should be replaced by .env variable)
  const token = jwt.sign({_id: user._id}, '124aww12423ad24124awdrtaeNADAIUASNFI@$h1247asd');
  // res.set('authorization', `${token}`).send();  // Normal way to send in header
  
  // send as JSON and get it from front-end
  res.status(201).json({
    authorization: token
  }).send();
});

module.exports = router;
