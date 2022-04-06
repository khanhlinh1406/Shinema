const express = require('express')
var router = express.Router()

const showTimeController = require('../controller/showTime')
const { authenToken } = require('../controller/authen')

router.get('/', authenToken, showTimeController.getAll)
router.get('/:id', authenToken, showTimeController.getById)

router.post('/', authenToken, showTimeController.create)

router.put('/:id', authenToken, showTimeController.update)

router.delete('/:id', authenToken, showTimeController.deleteById)

module.exports = router