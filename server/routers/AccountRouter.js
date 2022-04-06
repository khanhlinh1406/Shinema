const express = require('express')
var router = express.Router()

const accountController = require('../controller/account')
const { authenToken } = require('../controller/authen')

router.get('/', authenToken, accountController.getAll)
router.get('/:email', authenToken, accountController.getByEmail)

router.post('/', accountController.create)
router.post('/checkEmail/:email', accountController.checkEmail)

router.put('/:email', accountController.update)

router.delete('/:email', accountController.deleteByEmail)

module.exports = router