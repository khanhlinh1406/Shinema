const TicketModel = require('../models/ticket')
const mFunction = require('../../client/src/function')


const ticketController = {
    getAll: (req, res) => {
        TicketModel.find({})
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ Err: err })
            })
    },

    getById: (req, res) => {
        TicketModel.findOne({
                id: req.params.id,
            })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ Err: err })
            })
    },

    create: (req, res) => {
        AccountModel.findOne({
                id: req.body.id
            })
            .then(data => {
                if (data) {
                    res.send('Id already exists')
                    return
                } else {
                    const newTicket = {
                        id: req.body.id,
                        _filmId: req.body._filmId,
                        _theaterId: req.body._theaterId,
                        _roomId: req.body._roomId,
                        seatId: req.body.seatId,
                        occurAt: req.body.occurAt,
                        _userId: req.body._userId,
                        bookedTime: req.body.bookedTime,
                        isCancelled: req.body.isCancelled,
                        invoice: {
                            id: req.body.id,
                            quantity: req.body.invoice.quantity,
                            price: req.body.invoice.price,
                            total: req.body.invoice.total,
                            method: req.body.invoice.method
                        }
                    }

                    return TicketModel.create(newTicket)
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
        TicketModel.updateOne({ id: req.body.id }, {
                id: req.body.id,
                _filmId: req.body._filmId,
                _theaterId: req.body._theaterId,
                _roomId: req.body._roomId,
                seatId: req.body.seatId,
                occurAt: req.body.occurAt,
                _userId: req.body._userId,
                bookedTime: req.body.bookedTime,
                isCancelled: req.body.isCancelled,
                invoice: req.body.invoice
            }, { new: 'true' })
            .then(data => {
                res.json("Update successful")
            })
            .catch(err => {
                res.status(500).json({ Err: err })
            })
    },

    deleteById: (req, res) => {
        TicketModel.deleteOne({
                id: req.params.id
            })
            .then(data => {
                res.json("Delete successful")
            })
            .catch(err => {
                res.status(500).json({ Err: err })
            })
    }
}

module.exports = ticketController