const express = require('express');
const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

exports.signup = async (req, res) => {
  const { ecode, password } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ where: { ecode } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await User.create({ ecode, password: hashedPassword });
    
    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error during signup:', error);

    // Handle specific Sequelize errors
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ message: 'Validation Error', errors: error.errors });
    }

    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.login = async (req, res) => {
  const { ecode, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ where: { ecode } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);

    return res.json({ token, message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);

    // Handle specific Sequelize errors
    if (error.name === 'SequelizeDatabaseError') {
      return res.status(500).json({ message: 'Database Error' });
    }

    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
