const Transaction = require('../models/transactionModel');

const addTransaction = async (req,res)=>{
    try{
        const transaction = await Transaction.create({
            amount: req.body.amount,
            category: req.body.category,
            description: req.body.description,
            userId: req.user.id 
        });
    }

    catch(err){
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
