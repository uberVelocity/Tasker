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
    console.log(error);
    return res.status(400).send(error.details[0].message);
  }

  // Check if user already in db
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    console.log('email already exists');
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
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  console.log('logging in user');

  // Validate user
  const { error } = await loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Check if email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send('Email is wrong');
  }

  // Check if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res.status(400).send('Invalid password');
  }

  // Create and assign a JSON Web Token (string should be replaced by .env variable)
  const token = jwt.sign({_id: user._id}, '124aww12423ad24124awdrtaeNADAIUASNFI@$h1247asd');
  res.set('auth-token', token);
  res.json({
    authtoken: token
  });

});

module.exports = router;
