const AccountModel = require('../models/account')
const mFunction = require('../../client/src/function')
const { decode } = require('base-64');
const { encode } = require('base-64');


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
                    return
                    // } else if (!mFunction.validatePhoneNumber(req.body.phoneNumber)) {
                    //     res.send('Contact consist of numeric and 10 characters')
                    //     return
                } else if (!mFunction.validatePassword(req.body.password)) {

                    res.send('Password has more than 6 charactor')
                    return
                } else {
                    const newAccount = {
                        name: req.body.email,
                        contact: req.body.contact,
                        identifyNumber: req.body.identifyNumber,
                        address: req.body.address,
                        birthday: req.body.birthday,
                        email: req.body.email,
                        password: encode(req.body.password),
                        rank: req.body.rank,
                        score: req.body.score,
                        listTicketId: req.body.listTicketId,
                        listReview: req.body.listReview
                    }

                    return AccountModel.create(newAccount)
                }
            })
            .then(data => {
                res.send("Successful")
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