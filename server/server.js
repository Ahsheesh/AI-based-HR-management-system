import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import cors from 'cors';
// const productRoutes = require('./productRoutes');
// const authRoutes = require('./authRoutes');
import authRoutes from '../backend/Routes/authRoutes.js';

const app = express();
const PORT = process.env.PORT || 5500;

// Get directory name in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// Import mongoose connection
//const { User } = require('../backend.Models/auth');

//Connection
mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Add this middleware before your routes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

// Middleware
app.use(cors({
  origin: 'http://127.0.0.1:5500', // Replace with your frontend's local server
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', authRoutes);

// API endpoint placeholder
// This is where you would fetch data from your database (e.g., MongoDB)
app.get('/api/greeting', (req, res) => {
    // In a real app, you might fetch user data
    res.json({ greeting: 'Hello, Alex' });
});

// The "catchall" handler: for any request that doesn't match one above,
// send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});