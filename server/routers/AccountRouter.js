const { json } = require('body-parser')
const express = require('express')
var router = express.Router()
const AccountModel = require('../models/account')

router.get('/', (req, res, next) => {
    AccountModel.find({})
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).json('Server error')
        })
})

router.post('/', (req, res, next) => {
    AccountModel.findOne({
        email: req.body.email
    })
        .then(data => {
            if (data) {
                res.json('user ton tai')
            }
            else {
                return AccountModel.create({
                    name: req.body.name,
                    contact: req.body.contact,
                    identifyNumber: req.body.identifyNumber,
                    address: req.body.address,
                    birthday: req.body.birthday,
                    email: req.body.email,
                    password: req.body.password,
                    rank: req.body.rank,
                    score: req.body.score,
                    listTicketId: req.body.listTicketId,
                    listReview: req.body.listReview,
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

router.put('/:username', (req, res, next) => {
    AccountModel.updateOne(
        {
            username: req.params.username
        },
        {
            password: req.body.newPassword
        })
        .then(data => {
            res.json("Update successful")
        })
        .catch(err => {
            res.status(500).json("Update error")
        })
})

router.delete('/:username', (req, res, next) => {
    AccountModel.deleteOne({
        username: req.params.username
    })
        .then(data => {
            res.json("Delete successful")
        })
        .catch(err => {
            res.status(500).json("Delete error")
        })
})

module.exports = router