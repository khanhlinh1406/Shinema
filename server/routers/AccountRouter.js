const { json } = require('body-parser')
const express = require('express')
var router = express.Router()
const AccountModel = require('../models/account')

const { getAll, getByEmail, create, deleteByEmail, update } = require('../controller/account')

router.get('/', getAll)
//router.get('/:email', getByEmail)
router.post('/', create)
router.put('/:email', update)
router.delete('/:email', deleteByEmail)

module.exports = router