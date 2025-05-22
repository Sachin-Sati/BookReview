const User = require('../models/user');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({username, email, password});
        await newUser.save();
        res.status(200).json({ message: 'Registered Succesfully!'});       
    } catch (error) {
        res.status(500).json({ error: 'Server Error', details: error.message })
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;
    const foundUser = await User.validateUser(username, password);
    if(foundUser) {
        const token = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET);
        res.cookie('access-token', token, {
            httpOnly: true,
            secure: true,
            maxAge: 60*60*24*30*1000,
        })
        res.status(200).json({ message: `Welcome, ${username}`});
    } else {
        res.status(400).json({ error: 'Invalid Username or Password'});
    }
}

module.exports = {signup, login};