const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const validateReview = require('../middleware/validateReview');
const Review = require('../models/review');
const {addReview, updateReview, deleteReview} = require('../controllers/reviewController');

// Add Review
router.post('/books/:id/reviews', authenticateToken, addReview);

// Update Review
router.put('/reviews/:id', authenticateToken, validateReview, updateReview);

// Delete Review
router.delete('/reviews/:id', authenticateToken, validateReview, deleteReview);

// Export Router
module.exports = router;