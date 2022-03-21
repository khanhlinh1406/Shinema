const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const dotenv = require('dotenv')
dotenv.config()

const app = express()
const PORT = process.env.port || 3001

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

var accountRouter = require('./routers/AccountRouter')
app.use('/api/account/', accountRouter)