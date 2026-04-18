const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const passwordReset = sequelize.define('passwordReset', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: false
});

module.exports = passwordReset;