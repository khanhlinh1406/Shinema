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

    getByUser: (req, res) => {
        TicketModel.find({
                email: req.body.email
            })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ Err: err })
            })
    },

    getBookedSeats: (req, res) => {
        TicketModel.find({
                ///showTime
                dateOccur: req.params.dateOccur,
                timeOccur: req.params.timeOccur,
                _theaterId: req.params._theaterId,
                _roomId: req.params._roomId,
            }, {
                projection: {
                    id: 0,
                    seatId: 1
                }
            })
            .then(data => {
                if (data === null || data === undefined)
                    res.send("getBookedSeats returns null/ undefined")
                else
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
                        dateOccur: req.body.dateOccur,
                        timeOccur: req.body.timeOccur,
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

                    if (newTicket.id === null || newTicket.id == '')
                        return res.send('Ticket ID null')
                    if (newTicket._filmId === null || newTicket._filmId == '')
                        return res.send('Ticket filmId null')
                    if (newTicket._theaterId === null || newTicket._theaterId == '')
                        return res.send('Ticket theaterId null')
                    if (newTicket._roomId === null || newTicket._roomId == '')
                        return res.send('Ticket RoomId null')
                    if (newTicket._seatId === null || newTicket._seatId == '')
                        return res.send('Ticket seatId null')
                    if (newTicket.dateOccur === null || newTicket.dateOccur == '')
                        return res.send('Ticket DateOccur null')
                    if (newTicket.timeOccur === null || newTicket.timeOccur == '')
                        return res.send('Ticket TimeOccur null')
                    if (newTicket._userId === null || newTicket._userId == '')
                        return res.send('Ticket UserId null')
                    if (newTicket.bookedTime === null || newTicket.bookedTime == '')
                        return res.send('Booked Time null')
                    if (newTicket.isCancelled === null || newTicket.isCancelled == '')
                        return res.send('Is Cancel null')


                    if (newTicket.invoice.id === null || newTicket.invoice.id == '')
                        return res.send('Invoice Id null')
                    if (newTicket.invoice.quantity === null || newTicket.invoice.quantity == '')
                        return res.send('Invoice Quantity null')
                    if (newTicket.invoice.price === null || newTicket.invoice.price == '')
                        return res.send('Invoice Price null')
                    if (newTicket.invoice.total === null || newTicket.invoice.total == '')
                        return res.send('Invoice Total null')
                    if (newTicket.invoice.method === null || newTicket.invoice.method == '')
                        return res.send('Invoice Method null')

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
                dateOccur: req.body.dateOccur,
                timeOccur: req.body.timeOccur,
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