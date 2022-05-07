const express = require('express')
var router = express.Router()

const accountController = require('../controller/account')
const { authenToken } = require('../controller/authen')

router.get('/', authenToken, accountController.getAll)
router.get('/:email', accountController.getByEmail)

router.post('/', accountController.create)
router.post('/checkEmail/:email', accountController.checkEmail)

router.put('/', accountController.update)
router.put('/password', accountController.updatePassword)

router.delete('/:email', accountController.deleteByEmail)

module.exports = router