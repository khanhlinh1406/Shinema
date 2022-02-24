const express = require('express')
var app = express()
var bodyParser = require('body-parser')

const AccountModel = require('./models/account')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/register', (req, res, next) => {
    AccountModel.findOne({
        username: req.body.username
    })
        .then(data => {
            if (data) {
                res.json('user ton tai')
            }
            else {
                return AccountModel.create({
                    username: req.body.username,
                    password: req.body.password
                })
            }
        })
        .then(data => {
            res.json("Successful")
        })
        .catch(err => {
            res.status(500).json("Error")
        })
})

var accountRouter = require('./routers/AccountRouter')
app.use('/api/account/', accountRouter)

app.get('/', (req, res, next) => {
    res.json("home 23")
})

app.listen(3000, () => {
    console.log(`Server started on port`)
})