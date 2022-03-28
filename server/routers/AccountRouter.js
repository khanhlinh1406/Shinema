const express = require('express')
var router = express.Router()

const { getAll, getByEmail, create, deleteByEmail, update, login } = require('../controller/account')
const { authenToken } = require('../controller/authen')

router.get('/', getAll)
    //router.get('/:email', getByEmail)
router.post('/', create)
router.put('/:email', update)
router.delete('/:email', deleteByEmail)

module.exports = router