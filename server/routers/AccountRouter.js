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