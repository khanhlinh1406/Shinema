const ShowTimeModel = require('../models/showTime')
const mFunction = require('../../client/src/function')

const showTimeController = {
    getAll: (req, res) => {
        ShowTimeModel.find({})
            .then(data => {
                res.json(data)
            })
            .catch(err => {
                res.status(500).json({ Err: err })
            })
    },

    getById: (req, res) => {
        ShowTimeModel.findOne({
                id: req.params.id
            })
            .then(data => {
                res.json(data)
            })
            .catch(err => {
                res.status(500).json({ Err: err })
            })
    },

    getByFilmId: (req, res) => {
        ShowTimeModel.findOne({
                filmId: req.params.filmId
            })
            .then(data => {
                res.json(data)
            })
            .catch(err => {
                res.status(500).json({ Err: err })
            })
    },

    create: (req, res) => {
        const newShowTime = {
            filmId: req.body.filmId,
            theaterId: req.body.theaterId,
            listDateTime: req.body.listDateTime
        }
        ShowTimeModel.create(newShowTime)
            .then(data => {
                res.send("Successful")
            })
            .catch(err => {
                res.status(500).json({ Err: err })
            })
    },

    update: (req, res) => {

        ShowTimeModel.updateOne({ id: req.body.id }, {
                filmId: req.body.filmId,
                theaterId: req.body.theaterId,
                listDateTime: req.body.listDateTime
            }, { new: 'true' })
            .then(data => {
                res.json("Update successful")
            })
            .catch(err => {
                res.status(500).json({ Err: err })
            })
    },

    updateByFilmId: (req, res) => {

        ShowTimeModel.findOneAndUpdate({ filmId: req.body.filmId }, {
                filmId: req.body.filmId,
                theaterId: req.body.theaterId,
                listDateTime: req.body.listDateTime
            }, { new: 'true' })
            .then(data => {
                res.json("Update successful")
            })
            .catch(err => {
                res.status(500).json({ Err: err })
            })
    },

    delete: (req, res) => {
        ShowTimeModel.findByIdAndRemove(req.params.id)
            .then(data => {
                res.json("Delete successful")
            })
            .catch(err => {
                res.status(500).json("Delete error")
            })
    },

}
module.exports = showTimeController