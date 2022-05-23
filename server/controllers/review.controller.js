const ReviewModel = require('../models/review.model')

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
                _id: req.params.id
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
            pilot: req.body.pilot,
            advantage: req.body.advantage,
            defect: req.body.defect,
            overview: req.body.overview,
            star: req.body.star,
            isVisible: req.body.isVisible,
            _userId: req.body._userId,
            _filmId: req.body._filmId
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
                pilot: req.body.pilot,
                advantage: req.body.advantage,
                defect: req.body.defect,
                overview: req.body.overview,
                star: req.body.star,
                isVisible: req.body.isVisible,
                _censorshipId: req.body._censorshipId,
                _userId: req.body._userId,
                _filmId: req.body._filmId
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