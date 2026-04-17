/* 


require('dotenv').config();
const sequelize = require('../db');
const Transaction = require('../models/transactionModel');
const User = require('../models/usersmodel');
const Payment = require('../models/paymentModel');

const resetAllData = async () => {
    try {
        await sequelize.sync();

        await Transaction.destroy({ where: {}});
        await User.destroy({ where: {}});
        await Payment.destroy({where: {}});

        console.log("✅ All data reset");
        process.exit();

    } catch (err) {
        console.log("❌ Error:", err.message);
        process.exit(1);
    }
};

resetAllData();



*/