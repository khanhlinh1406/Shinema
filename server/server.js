const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const app = express()
const PORT = process.env.port || 3000
const URI = 'mongodb+srv://shinema_db:ThucLinh123@cluster0.leaz1.mongodb.net/Shinema?retryWrites=true&w=majority'

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect(URI)
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
