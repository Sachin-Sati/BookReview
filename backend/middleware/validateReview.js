const Review = require('../models/review');
const mongoose = require('mongoose');

const validateReview = async (req, res, next) => {
    const reviewId = req.params.id;
    const userId = req.user.id;

    // Check if reviewId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
        return res.status(400).json({ error: 'Invalid Review ID' });
    }

    // check if review exists
    const review = await Review.findById(reviewId);
    if(!review) return res.status(404).json({ error: 'Review Not Found' });

    // check if user owns review
    if(review.user.toString() !== userId) {
        return res.status(403).json({ error: 'Unauthorized User' });
    }

    req.review = review;

    next();
}

// Export validateReview
module.exports = validateReview;