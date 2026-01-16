
const mongoose = require("mongoose");

const mongoURL = "mongodb://localhost:27017/mydb";

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log('MongoDB connected successfully!')
    }
    catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;