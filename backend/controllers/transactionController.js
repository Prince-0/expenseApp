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
            }
        );

        const user = await User.findByPk(req.user.id, { transaction: t });

        const totalExpense =
            Number(user.totalExpenses) + Number(amount);

        await user.update(
            { totalExpenses: totalExpense },
            { transaction: t }
        );

        console.log("Before commit");
        await t.commit();
        console.log("After commit");


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

        res.json(transactions);   
    }
    catch(err){
        res.status(500).json(err);
    }
    
}

const deleteTransaction = async(req,res)=>{
    try{
        await Transaction.destroy({
            where:{
                 id:req.params.id ,
                 userId:req.user.id
            }
        });

        res.send("Transaction deleted");
    }

    catch(err){
    res.status(500).json(err);
    }

}

module.exports = { 
    addTransaction , getTransaction , deleteTransaction
};
