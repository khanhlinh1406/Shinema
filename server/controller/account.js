const AccountModel = require('../models/account')
const mFunction = require('../../client/src/function')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const accountController = {
    getAll: (req, res) => {
        AccountModel.find({})
            .then(data => {
                res.json(data)
            })
            .catch(err => {
                res.status(500).json({ Err: err })
            })
    },

    getByEmail: (req, res) => {
        AccountModel.findOne({
                email: req.params.email
            })
            .then(data => {
                res.json(data)
            })
            .catch(err => {
                res.status(500).json({ Err: err })
            })
    },

    create: (req, res) => {
        AccountModel.findOne({
                email: req.body.email
            })
            .then(data => {
                if (data) {
                    res.send('Email already exists')
                } else if (!mFunction.validatePhoneNumber(req.body.phoneNumber)) {
                    res.send('Contact consist of numeric and 10 characters')
                    return
                } else if (!mFunction.validatePassword(req.body.password)) {
                    res.send('Password has more than 6 charactor')
                    return
                } else {
                    const newAccount = req.body;
                    return AccountModel.create(newAccount)
                }
            })
            .then(data => {
                res.json("Successful")
            })
            .catch(err => {
                res.status(500).json({ Err: err })
            })
    },

    update: (req, res) => {
        const newAccount = req.body;
        AccountModel.updateOne({ email: req.params.email }, { newAccount }, { new: 'true' })
            .then(data => {
                res.json("Update successful")
            })
            .catch(err => {
                res.status(500).json({ Err: err })
            })
    },

    deleteByEmail: (req, res) => {
        AccountModel.deleteOne({
                email: req.params.email
            })
            .then(data => {
                res.json("Delete successful")
            })
            .catch(err => {
                res.status(500).json("Delete error")
            })
    },

    checkEmail: (req, res) => {
        AccountModel.findOne({ email: req.params.email })
            .then(data => {
                if (data) {
                    res.send('Email already exists')
                } else {
                    res.send('EmailOK')
                }
            })
            .catch(err => console.log(err))
    }
}
module.exports = accountController