const mongoose = require("mongoose");
require('dotenv').config({path: "./.env"})


const connectDB = async() => {
    await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true
    });

    console.log("MongoDB connected")
}

module.exports = connectDB