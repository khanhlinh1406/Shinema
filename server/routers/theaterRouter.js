const express = require('express')
var router = express.Router()

const theaterController = require('../controller/theater')
const { authenToken } = require('../controller/authen')

router.get('/', authenToken, theaterController.getAll)
router.get('/:id', authenToken, theaterController.getById)

router.post('/', theaterController.create)

router.put('/:id', theaterController.update)

router.delete('/:id', theaterController.deleteById)

module.exports = router