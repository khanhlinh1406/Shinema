const express = require('express')
var router = express.Router()

const showTimeController = require('../controller/showTime')
const { authenToken } = require('../controller/authen')

router.get('/', authenToken, showTimeController.getAll)
router.get('/:id', authenToken, showTimeController.getById)
router.get('/byFilmId/:filmId', showTimeController.getByFilmId)

router.post('/', authenToken, showTimeController.create)

router.put('/', showTimeController.update)
router.put('/byFilmId', showTimeController.updateByFilmId)

router.delete('/:id', showTimeController.delete)

module.exports = router