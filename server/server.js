const express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://shinema_db:ThucLinh123@cluster0.leaz1.mongodb.net/Shinema?retryWrites=true&w=majority')
mongoose.connection.on("connected", () => {
    console.log("MongoDB Connected!")
})
mongoose.connection.on("error", () => {
    console.log("Connect MongoDB Failed!")
})

var accountRouter = require('./routers/AccountRouter')
app.use('/api/account/', accountRouter)

app.get('/', (req, res, next) => {
    res.json("home 23")
})

app.listen(3000, () => {
    console.log(`Server started on port`)
})