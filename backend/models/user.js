const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// User Schema
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "username cannot be empty!"],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "password cannot be empty!"],
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

// Hash Password Before Saving
userSchema.pre('save', async function(next) {
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();    
    } catch (error) {
        next(error);
    }
})

// Verify Hash Password
userSchema.statics.validateUser = async function(username, password) {
    const foundUser = await this.findOne({username});
    if(!foundUser) return false;
    const isValid = await bcrypt.compare(password, foundUser.password);
    return isValid ? foundUser : false;
}

// User Model
const User = mongoose.model("User", userSchema);

// Export Model
module.exports = User;