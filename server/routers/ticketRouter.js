const express = require('express')
var router = express.Router()

const ticketController = require('../controller/ticket')

router.get('/', ticketController.getAll)
router.get('/:id', ticketController.getById)
router.get('/user', ticketController.getByUser)
router.get('/bookedSeats/:theaterId/:roomId/:date/:time', ticketController.getBookedSeats)

router.post('/', ticketController.create)

router.put('/', ticketController.update)

router.delete('/:id', ticketController.deleteById)

module.exports = router