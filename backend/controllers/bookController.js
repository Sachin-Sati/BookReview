const Book = require('../models/book');

// Add Book
const addBook = async (req, res) => {
    try {
        const { title, author, genre } = req.body;
        const book = new Book({ title, author, genre, avgRating:0, reviews:[] });
        await book.save();
        res.status(200).json({ message: 'New Book Added', book});        
    } catch (error) {
        res.status(400).json({ error: 'Failed to Add Book' });
    }
}

// Show All Books
const getBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        if(!books) return res.status(404).json({ error: 'Books Not Found'});
        res.status(200).json(books);      
    } catch (error) {
        res.status(400).json({ error: 'Server Error' });
    }
}

// Show Book Details
const bookDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id).select('-_id title author genre avgRating reviews');
        if(!book) return res.status(404).json({ error: 'Book Not Found'});
        res.status(200).json(book); 
    } catch (error) {
        res.status(400).json({ error: 'Server Error'});
    }
}

module.exports = {addBook, getBooks, bookDetails};