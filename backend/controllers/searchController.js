const Book = require('../models/book');

const searchBooks = async (req, res) => {
    try {
        const query = req.query.q;                  // url search query
        if(!query) return res.status(404).json({ error: 'Search Query Not Found' });
        const regex = new RegExp(query, 'i');       // i => case-insentive
        const books = await Book.find({
            $or: [{title: regex},{author: regex}]
        });
        res.status(200).json({ message: 'Books Matched', books});        
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
}

module.exports = searchBooks;