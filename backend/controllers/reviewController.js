const Book = require('../models/book');
const Review = require('../models/review');

// Add Review
const addReview = async (req, res) => {
    try {
        const bookId = req.params.id;
        const userId = req.user.id;
        const {rating, comment} = req.body;

        // check if book exists
        const book = await Book.findById(bookId);
        if(!book) return res.status(404).json({ error: 'Book Not Found'});

        // check if user already reviewed the book
        const existingReview = await Review.findOne({ book: bookId, user:userId });
        if(existingReview) return res.status(400).json({ error: 'You already reviewed this book'});

        // add review
        const newReview = new Review({ book: bookId, user: userId, rating, comment });
        await newReview.save();
        book.reviews.push(newReview._id);
        await book.save();
        res.status(200).json({ message: 'Review Added', review: newReview}); 
    } catch (error) {
        res.status(500).json({ error: 'Server Error', details: error.message });
    }
}

// Update Review
const updateReview = async(req, res) => {
    try {
        const reviewId = req.params.id;
        const updatedReview = await Review.findByIdAndUpdate(reviewId, req.body, { new: true });
        res.status(200).json({ message: 'Review Updated', review: updatedReview});        
    } catch (error) {
        res.status(500).json({ error: 'Server Error', details: error.message });
    }
}

// Delete Review
const deleteReview = async (req, res) => {
    try {
        await req.review.deleteOne();
        res.status(200).json({ message: 'Review Deleted'});
    } catch (error) {
        res.status(500).json({ error: 'Server Error', details: error.message });
    }
}

module.exports = {addReview, updateReview, deleteReview};