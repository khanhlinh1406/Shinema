const AccountModel = require('../models/account')

exports.getAll = function (req, res) {
    AccountModel.find({})
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).json('Server error')
        })
}

exports.getByEmail = function (res, req) {

}

exports.post = function (req, res) {
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
}

exports.update = function (req, res) {
    AccountModel.updateOne(
        {
            email: req.params.email
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