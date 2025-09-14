import express from 'express';
// import bcrypt from('bcryptjs');
// // import mongoose from ('mongoose');
// import { User } from ('./dbSchema');
import { handleSignup, handleLogin } from '../Controllers/authControllers.js';

const router = express.Router();

// Authentication Routes
router.post('/signup', handleSignup)
router.post('/login', handleLogin)

//module.exports = router;
export default router;