const ReviewModel = require('../models/review.model')
const mFunction = require('../../client/src/function')

const reviewController = {
    getAll: (req, res) => {
        ReviewModel.find({})
            .then(data => {
                res.json(data)
            })
            .catch(err => {
                res.status(500).json({ Err: err })
            })
    },

    getById: (req, res) => {
        ReviewModel.findOne({
                id: req.params.id
            })
            .then(data => {
                res.json(data)
            })
            .catch(err => {
                res.status(500).json({ Err: err })
            })
    },

    create: (req, res) => {
        const newTheater = {
            title: req.body.title,
            description: req.body.description,
            star: req.body.star,
            isVisible: req.body.isVisible,
            _censorshipId: req.body._censorshipId,
            _userId: req.body._userId
        }
        ReviewModel.create(newTheater)
            .then(data => {
                res.send("Successful")
            })
            .catch(err => {
                res.status(500).json({ Err: err })
            })
    },

    update: (req, res) => {
        ReviewModel.updateOne({ id: req.body._id }, {
                title: req.body.title,
                description: req.body.description,
                star: req.body.star,
                isVisible: req.body.isVisible,
                _censorshipId: req.body._censorshipId,
                _userId: req.body._userId
            }, { new: 'true' })
            .then(data => {
                res.json("Update successful")
            })
            .catch(err => {
                res.status(500).json({ Err: err })
            })
    },

    deleteById: (req, res) => {
        ReviewModel.deleteOne({
                id: req.params.id
            })
            .then(data => {
                res.json("Delete successful")
            })
            .catch(err => {
                res.status(500).json("Delete error")
            })
    },
}
module.exports = reviewController