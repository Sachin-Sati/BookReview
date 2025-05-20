require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const cookieParser = require('cookie-parser');

const authenticateToken = require('./middleware/auth');
const validateReview = require('./middleware/validateReview');

const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const searchRoutes = require('./routes/searchRoutes');

const Book = require('./models/book');

// Initialize Express App 
const app = express();

app.use(express.json());
app.use(cookieParser());

// Listen for Incomming Requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`SERVER RUNNING AT http://localhost:${PORT}`);
})

// Establish Connection
connectDB();

// Routes
app.use('/', userRoutes);
app.use('/', bookRoutes);
app.use('/', reviewRoutes);
app.use('/', searchRoutes);

// Catch Cast Errors
app.use((err, req, res, next) => {
  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'Invalid ID' });
  }
  next(err);
});