const express = require('express');
const Router = express.Router();

const {
  getPaymentPage,
  processPayment,
  getPaymentStatus
} = require('../controllers/paymentController');

const authenticate = require('../middleware');

Router.get('/', getPaymentPage);

Router.post('/pay', authenticate, processPayment);

Router.get('/payment-status/:orderId', authenticate, getPaymentStatus);

module.exports = Router;