const mongoose = require('mongoose');

// Book Schema
const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    avgRating: {
        type: Number,
        default: 0
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',                              // references Review Model
    }],
}, {
    timestamps: true
});

// Book Model
const Book = mongoose.model('Book', bookSchema);

// Export Model
module.exports = Book;