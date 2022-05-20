const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const dotenv = require('dotenv')
dotenv.config()

const app = express()

const PORT = process.env.URL_SERVER

const cors = require('cors');
app.use(cors());

var cookieParser = require('cookie-parser')
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

var emailRouter = require('./routes/email.routes')
app.use('/api/sendMail', emailRouter)

var accountRouter = require('./routes/account.routes')
app.use('/api/account/', accountRouter)

var showTimeRouter = require('./routes/showTime.routes')
app.use('/api/showTime/', showTimeRouter)

var theaterRouter = require('./routes/theater.routes')
app.use('/api/theater/', theaterRouter)

var ticketRouter = require('./routes/ticket.routes')
app.use('/api/ticket/', ticketRouter)

var reviewRouter = require('./routes/review.routes')
app.use('/api/review/', reviewRouter)

var cloudinary = require('./routes/cloudinary.routes')
app.use('/api/cloudinary', cloudinary)

var dialogFlowRouter = require('./routes/dialogFlow.routes')
app.use('/api/dialogFlow/', dialogFlowRouter)