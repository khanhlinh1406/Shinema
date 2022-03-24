const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const dotenv = require('dotenv')
dotenv.config()

var cookieParser = require('cookie-parser')

const app = express()
const PORT = 5500
app.use(cookieParser())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
});

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB Connected!")
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })
    })
    .catch(err => {
        console.log('err', err)
    })

var jwtRouter = require('./routers/jwtRouter')
app.use('/auth/', jwtRouter)

var accountRouter = require('./routers/AccountRouter')
app.use('/api/account/', accountRouter)