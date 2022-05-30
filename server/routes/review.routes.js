const express = require('express')
var router = express.Router()

const reviewController = require('../controllers/review.controller')
const { authenToken } = require('../controllers/authen.controller')

router.get('/', reviewController.getAll)
router.get('/:id', reviewController.getById)

router.post('/', reviewController.create)

router.put('/', reviewController.update)
router.put('/insertCmt', reviewController.insertCmt)

router.delete('/:id', reviewController.deleteById)

module.exports = router