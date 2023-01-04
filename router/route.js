const express = require('express')
const router = express.Router()
const customerController = require('../controller/customerController')
const orderController = require('../controller/orderController')
const auth = require('../middleware/auth')

router.post('/createCus', customerController.createCustomer)
router.post('/login', customerController.login)

router.post('/createOrder/:customerId', auth.authenticate, auth.authorise, orderController.createOrder)
router.get('/get', orderController.getOrder)

module.exports = router