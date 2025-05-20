const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const {signup, login} = require('../controllers/userController');

// Signup
router.post('/signup', signup);

// Login
router.post('/login', login);

// Export Router
module.exports = router;