const mongoose = require('mongoose');

// Review Schema
const reviewSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,       // stores objectid
        ref: 'User',                                // references User Model
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',                                // references Book Model
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1, 
        max: 10
    },
    comment: {
        type: String,
        required: true,
        trim: true
    },
}, {
    timestamps: true
});

// One Review Per Person Per Book
reviewSchema.index({ user: 1, book: 1 }, { unique: true });

// Review Model
const Review = mongoose.model('Review', reviewSchema);

// Export Model
module.exports = Review;