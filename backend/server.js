const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 1337

//call connection DB module
connectDB()

const app = express()

//add middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/kudos', require('./routes/kudoRoutes'))

//use error handler middleware
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port: ${port}`))