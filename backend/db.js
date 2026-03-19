const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('expensetrackerr', 'root', '@dbquery123', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;