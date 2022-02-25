const { json } = require('body-parser')
const express = require('express')
var router = express.Router()
const AccountModel = require('../models/account')

const { getAll, getByEmail, post, deleteByEmail, update } = require('../controller/account')

router.get('/', getAll)
//router.get('/:email', getByEmail)
router.post('/', post)
router.put('/:email', update)
router.delete('/:email', deleteByEmail)

module.exports = router