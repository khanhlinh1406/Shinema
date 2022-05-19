const TicketModel = require('../models/ticket.model')
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
                email: req.params.email
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
                    dateOccur: req.params.dateOccur,
                    timeOccur: req.params.timeOccur,
                    _theaterId: req.params._theaterId,
                    _roomId: req.params._roomId,
                },
                // {
                //     "id": 0,
                //     "seatIdArray": 1
                // }
            )
            .then(data => {
                if (data === null || data === undefined)
                    res.send("getBookedSeats returns null/ undefined")
                else {
                    let result = data.map((item) => item.seatIdArray)
                    res.json(result);
                }

            })
            .catch(err => {
                res.status(500).json({ Err: err })
            })

    },

    create: (req, res) => {
        TicketModel.findOne({
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
                        seatIdArray: req.body.seatIdArray,
                        dateOccur: req.body.dateOccur,
                        timeOccur: req.body.timeOccur,
                        _userEmail: req.body._userEmail,
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
                    if (newTicket._seatIdArray === null || newTicket._seatIdArray == '')
                        return res.send('Ticket seatIdArray null')
                    if (newTicket.dateOccur === null || newTicket.dateOccur == '')
                        return res.send('Ticket DateOccur null')
                    if (newTicket.timeOccur === null || newTicket.timeOccur == '')
                        return res.send('Ticket TimeOccur null')
                    if (newTicket._userEmail === null || newTicket._userEmail == '')
                        return res.send('Ticket User email null')
                    if (newTicket.bookedTime === null || newTicket.bookedTime == '')
                        return res.send('Booked Time null')
                            // if (newTicket.isCancelled === null || newTicket.isCancelled == '')
                            //     return res.send('Is Cancel null')


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
                seatIdArray: req.body.seatIdArray,
                dateOccur: req.body.dateOccur,
                timeOccur: req.body.timeOccur,
                _userEmail: req.body._userEmail,
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