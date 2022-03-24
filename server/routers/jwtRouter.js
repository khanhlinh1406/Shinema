const express = require('express')
var router = express.Router()

const { login, refresh, getToken } = require('../controller/authen')

router.post('/login', login)
router.post('/refreshToken', refresh)

module.exports = router