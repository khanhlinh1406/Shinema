const AccountModel = require('../models/account')

exports.getAll = function (req, res) {
    AccountModel.find({})
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).json({ Err: err })
        })
}

exports.getByEmail = function (req, res) {
    AccountModel.findOne({
        email: req.body.email
    })
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).json({ Err: err })
        })
}

exports.create = function (req, res) {
    AccountModel.findOne({
        email: req.body.email
    })
        .then(data => {
            if (data) {
                res.json('Email exist')
            }
            else {
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
}

exports.update = function (req, res) {
    const newAccount = req.body;
    AccountModel.updateOne({ email: req.params.email }, { newAccount }, { new: 'true' })
        .then(data => {
            res.json("Update successful")
        })
        .catch(err => {
            res.status(500).json({ Err: err })
        })
}

exports.deleteByEmail = function (req, res) {
    AccountModel.deleteOne({
        email: req.params.email
    })
        .then(data => {
            res.json("Delete successful")
        })
        .catch(err => {
            res.status(500).json("Delete error")
        })
}