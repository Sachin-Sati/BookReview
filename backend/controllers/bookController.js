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
        // handle query parameters
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        if(page < 1 || limit < 1) return res.status(400).json({ error: 'Page or Limit must be positive' });


        // calculate skip
        const skip = (page - 1) * limit;

        // calculate total books, total pages
        const totalBooks = await Book.countDocuments();
        const totalPages = Math.ceil(totalBooks/limit);

        // Fetch Books
        const books = await Book.find({}).skip(skip).limit(limit);
        if(!books || books.length === 0) return res.status(404).json({ error: 'No books found for this page'});
        res.status(200).json({
            page,
            limit,
            totalBooks,
            totalPages,
            data: books
        });      
    } catch (error) {
        res.status(400).json({ error: 'Server Error', details: error.message });
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