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

    create: (req, res) => {
        const newShowTime = {
            filmId: req.body.filmId,
            theaterId: req.body.theaterId,
            price: req.body.price,
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
        const newShowTime = {
            filmId: req.body.filmId,
            theaterId: req.body.theaterId,
            price: req.body.price,
            listDateTime: req.body.listDateTime
        }

        ShowTimeModel.updateOne({ id: req.params.id }, { newShowTime }, { new: 'true' })
            .then(data => {
                res.json("Update successful")
            })
            .catch(err => {
                res.status(500).json({ Err: err })
            })
    },

    deleteById: (req, res) => {
        ShowTimeModel.deleteOne({
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
module.exports = showTimeController