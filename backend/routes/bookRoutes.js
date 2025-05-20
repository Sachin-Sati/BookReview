const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const authenticateToken = require('../middleware/auth');
const {addBook, getBooks, bookDetails} = require('../controllers/bookController');

// Add Book
router.post('/books', authenticateToken, addBook);

// Get Books
router.get('/books', getBooks);

// Book Details
router.get('/books/:id', bookDetails);

// Export Router
module.exports = router;