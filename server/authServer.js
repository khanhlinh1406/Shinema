const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const dotenv = require('dotenv')
dotenv.config()

const app = express()
const PORT = process.env.URL_AUTHEN

const cors = require('cors');
app.use(cors());

var cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    // res.header(
    //     "Access-Control-Allow-Headers",
    //     "Origin, X-Requested-With, Content-Type, Accept"
    // );
    next()
});

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB Connected!")
        app.listen(PORT, () => {
            console.log(`Authen server started on port ${PORT}`)
        })
    })
    .catch(err => {
        console.log('err', err)
    })

var jwtRouter = require('./routers/jwtRouter')
app.use('/auth', jwtRouter)