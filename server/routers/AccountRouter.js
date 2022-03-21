const { json } = require('body-parser')
const express = require('express')
var router = express.Router()

const { getAll, getByEmail, create, deleteByEmail, update, login } = require('../controller/account')

router.get('/', getAll)
    //router.get('/:email', getByEmail)
router.post('/', create)
router.put('/:email', update)
router.delete('/:email', deleteByEmail)
router.post('/login', login)

module.exports = router