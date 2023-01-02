const express = require('express')
const router = express.Router()
const customerController = require('../controller/customerController')

router.post('/createCus', customerController.createCustomer)
router.post('/login',customerController.login)

module.exports = router