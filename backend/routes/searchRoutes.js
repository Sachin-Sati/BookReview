const express = require('express');
const router = express.Router();
const searchBooks = require('../controllers/searchController');

router.get('/search', searchBooks);

// Export Router
module.exports = router;