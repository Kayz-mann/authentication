require('dotenv').config({path: "./config"})
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const connectDB = require("./config/db")


// Config
const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true 
}))

// Router
app.use('/user', require('./routes/userRouter'))

// Connect to the database
connectDB()


app.use('/', (req, res, next) => {
    res.json({msg: "Hello Everyone"})
})


const PORT = process.env.PORT || 5000
 app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})

// to shorten error response to one line
// process.on("unhandledRejection", (err, promise) => {
//     console.log(`Logged Error: ${err}`);
//     server.close(() => process.exit(1))
// })