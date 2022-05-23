const express = require('express')
var router = express.Router()

const controller = require('../controllers/cloudinary.controller')

router.post('/', controller.uploadImages)
module.exports = router