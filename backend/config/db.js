const mongoose = require('mongoose');

const connectDB = () => {
    const conn = mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("CONNECTED TO BookReviewDB DATABASE!");
    })
    .catch((err) => {
        console.log("FAILED TO CONNECT TO DATABASE!");
        console.log(err);
    })
}

module.exports = connectDB;