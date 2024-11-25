import db from '../models/index.js';
const User =db.user;
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from "dotenv"
dotenv.config()
const signup = async (req, res) => {
  const { ecode, password } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ where: { ecode } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use',requestSuccessful:false });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await User.create({ ecode, password: hashedPassword });
    
    return res.status(201).json({ message: 'User created successfully',requestSuccessful:true });
  } catch (error) {
    console.error('Error during signup:', error);

    // Handle specific Sequelize errors
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ message: 'Validation Error', errors: error.errors,requestSuccessful:false });
    }

    return res.status(500).json({ message: 'Internal Server Error',requestSuccessful:false });
  }
};

const login = async (req, res) => {
  const { ecode, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ where: { ecode } });
    if (!user) {
      return res.status(404).json({ message: 'User not found',requestSuccessful:false });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password',requestSuccessful:false });
    }

    // Generate a JWT token
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);

    return res.json({ token, message: 'Login successful',requestSuccessful:true });
  } catch (error) {
    console.error('Error during login:', error);

    // Handle specific Sequelize errors
    if (error.name === 'SequelizeDatabaseError') {
      return res.status(500).json({ message: 'Database Error',requestSuccessful:false });
    }

    return res.status(500).json({ message: 'Internal Server Error',requestSuccessful:false });
  }
};

const controller={
  signup,login
}

export default controller