const AccountModel = require('../models/account')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

exports.getAll = function(req, res) {
    AccountModel.find({})
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).json({ Err: err })
        })
}

exports.getByEmail = function(req, res) {
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

exports.create = function(req, res) {
    AccountModel.findOne({
            email: req.body.email
        })
        .then(data => {
            if (data) {
                res.json('Email exist')
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
}

exports.update = function(req, res) {
    const newAccount = req.body;
    AccountModel.updateOne({ email: req.params.email }, { newAccount }, { new: 'true' })
        .then(data => {
            res.json("Update successful")
        })
        .catch(err => {
            res.status(500).json({ Err: err })
        })
}

exports.deleteByEmail = function(req, res) {
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

exports.login = function(req, res) {
    const data = req.body
    const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' })
    res.json({ accessToken })
        // AccountModel.findOne({
        //         email: req.body.email
        //     })
        //     .then(data => {
        //         if (data) {
        //             if (data.password == req.body.password) {
        //                 const data = req.body.email
        //                 const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' })
        //                 res.json({ accessToken })
        //             }
        //         } else {
        //             res.json('Email does not exist')
        //         }

    //     })
    //     .then(data => {
    //         res.json("Successful")
    //     })
    //     .catch(err => {
    //         res.status(500).json("loi roi")
    //     })
}