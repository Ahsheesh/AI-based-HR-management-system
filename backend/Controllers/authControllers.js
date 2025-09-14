import mongoose from 'mongoose';
import { model } from 'mongoose';
import User from '../Models/auth.js';

import express from 'express';
const router = express.Router();
import bcrypt from 'bcryptjs';


async function handleSignup(req, res){
    try {
      console.log('Signup Request Body:', req.body); // Log the entire request body
  
      const { username, password, confirmPassword } = req.body;
  
      if (!username || !password || !confirmPassword) {
        console.log('Missing required fields');
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      if (password !== confirmPassword) {
        console.log('Passwords do not match');
        return res.status(400).json({ message: 'Passwords do not match' });
      }
  
      const existingUser = await User.findOne({ 
        $or: [
          { username: username },
          { email: username }
        ]
      });
  
      if (existingUser) {
        console.log('User already exists');
        return res.status(400).json({ message: 'Username or email already exists' });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = new User({
        username: username,
        password: hashedPassword,
        name: username,
        email: `${username}@example.com`
      });
  
      const savedUser = await newUser.save();
      console.log('User saved successfully:', savedUser);
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Detailed Signup Error:', error);
      res.status(500).json({ 
        message: 'Server error during signup',
        error: error.message 
      });
    }
  };

async function handleLogin(req, res){
    try {
      const { username, password } = req.body;
  
      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }
  
      const user = await User.findOne({ 
        username: username,
      });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      user.lastLogin = new Date();
      await user.save();
  
      res.status(200).json({ 
        message: 'Login successful', 
        user: { 
          id: user._id, 
          username: user.username, 
          role: user.role 
        }
      });
    } catch (error) {
      console.error('Login Error:', error);
      res.status(500).json({ message: 'Server error during login' });
    }
};

// module.exports = { handleSignup, handleLogin };
export { handleSignup, handleLogin };