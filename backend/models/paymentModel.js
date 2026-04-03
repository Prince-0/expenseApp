const Sequelize = require('sequelize');
const sequelize = require('../db');

const Payment = sequelize.define('payment', {
  orderId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  paymentSessionId: {
    type: Sequelize.STRING
  },
  orderAmount: {
    type: Sequelize.INTEGER
  },
  orderCurrency: {
    type: Sequelize.STRING
  },
  paymentStatus: {
    type: Sequelize.STRING,
    defaultValue: 'PENDING'
  },
  userId: {
    type: Sequelize.INTEGER
  }
});

module.exports = Payment;