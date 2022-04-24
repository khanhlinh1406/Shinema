const express = require('express')
var router = express.Router()

const ticketController = require('../controller/ticket')

router.get('/', ticketController.getAll)
router.get('/:id', ticketController.getById)
router.get('/user/:email', ticketController.getByUser)
router.get('/bookedSeats/:_theaterId/:_roomId/:dateOccur/:timeOccur', ticketController.getBookedSeats)

router.post('/', ticketController.create)

router.put('/', ticketController.update)

router.delete('/:id', ticketController.deleteById)

module.exports = router