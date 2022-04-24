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
        ShowTimeModel.find({
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
            roomId: req.body.roomId,
            listDateTime: req.body.listDateTime
        }
        const runtime = req.body.runtime

        if (newShowTime.filmId == null || newShowTime.filmId == '') {
            return res.send('Film id invalid')
        } else if (newShowTime.theaterId == null || newShowTime.theaterId == '') {
            return res.send('Theater id invalid')
        } else if (newShowTime.roomId == null || newShowTime.roomId == '') {
            return res.send('Room id invalid')
        } else if (newShowTime.listDateTime == null || newShowTime.listDateTime.length == 0) {
            return res.send('List date time invalid')
        }


        ShowTimeModel.findOne({
            filmId: newShowTime.filmId,
            theaterId: newShowTime.theaterId,
            roomId: newShowTime.roomId
        }).then(data => {
            if (data) {
                return res.send('Show time has already existed')

            } else {

                //sort date
                newShowTime.listDateTime.sort((a, b) => new Date(a.date) - new Date(b.date))

                //sort time
                const getNumber = t => +t.replace(/:/g, '')
                newShowTime.listDateTime.forEach(dateTime => {
                    dateTime.times.sort((a, b) => getNumber(a) - getNumber(b))
                });


                //check times available with runtime of film
                let err = false
                newShowTime.listDateTime.forEach(dateTime => {
                    for (let i = 0; i < dateTime.times.length - 1; i++) {
                        if (parseInt(mFunction.subTime(dateTime.times[i], dateTime.times[i + 1])) < parseInt(runtime)) {
                            err = true
                            return
                        }
                    }
                });

                if (err) {
                    res.send('Times is not available')
                } else {
                    ShowTimeModel.findOne({
                        theaterId: newShowTime.theaterId,
                        roomId: req.body.roomId
                    }).then(data => {
                        if (data) {

                            if (mFunction.availableRoom(newShowTime.listDateTime, data.listDateTime, runtime)) {
                                ShowTimeModel.create(newShowTime)
                                    .then(data => {
                                        return res.send("Successful")
                                    })
                                    .catch(err => {
                                        res.status(500).json({ Err: err })
                                    })
                            } else {
                                res.send('Room is not available')
                            }

                        } else {
                            ShowTimeModel.create(newShowTime)
                                .then(data => {
                                    return res.send("Successful")
                                })
                                .catch(err => {
                                    res.status(500).json({ Err: err })
                                })
                        }
                    })
                }


            }
        }).catch(err => console.log(err))


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