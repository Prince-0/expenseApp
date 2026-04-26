const Transaction = require('../models/transactionModel');
const User = require('../models/usersmodel');
const sequelize = require('../db');
const categorizeExpense = require('../services/AIcategorizer');


const addTransaction = async (req,res)=>{
    const t = await sequelize.transaction();
    try{
        const { amount, description } = req.body;

        if (!amount || !description) {
            return res.status(400).json({
                message: "Amount and description are required"
            });
        }

        const category = await categorizeExpense(description);

        const transaction = await Transaction.create({
            amount,
            category,
            description,
            userId: req.user.id 
        },
        { 
            transaction: t 
        });

        const user = await User.findByPk(req.user.id, { transaction: t });

        const totalExpense = Number(user.totalExpenses) + Number(amount);

        await user.update(
            { totalExpenses: totalExpense },
            { transaction: t }
        );

        await t.commit();
        
        res.status(201).json({transaction});
    }

    catch(err){
        await t.rollback();
        res.status(500).json(err);
    }

}

const getTransaction = async (req,res) =>{
    try{
        const transactions = await Transaction.findAll({
            where: { userId: req.user.id }
        });

        res.status(200).json(transactions);   
    }
    catch(err){
        res.status(500).json(err);
    }
    
}

const deleteTransaction = async (req, res) => {
    const t = await sequelize.transaction();

    try {
        //  Find transaction
        const transaction = await Transaction.findOne({
            where: {
                id: req.params.id,
                userId: req.user.id
            },
            transaction: t
        });

        if (!transaction) {
            await t.rollback();
            return res.status(404).json({
                message: "Transaction not found"
            });
        }

        //  Get amount before delete
        const amount = transaction.amount;

        //  Delete transaction
        await transaction.destroy({ transaction: t });

        //  Get fresh user
        const user = await User.findByPk(req.user.id, { transaction: t });

        console.log("USER TOTAL BEFORE:", user.totalExpenses);

        //  Update totalExpenses
        const totalExpense = Number(user.totalExpenses) - Number(amount);

        await user.update(
            { totalExpenses: totalExpense },
            { transaction: t }
        );

        await t.commit();

        res.status(200).json({
            message: "Transaction deleted"
        });

    } catch (err) {
        await t.rollback();

        res.status(500).json({
            error: err.message
        });
    }
};

module.exports = { 
    addTransaction , getTransaction , deleteTransaction
};
