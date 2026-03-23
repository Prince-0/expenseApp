const Transaction = require('./transactionModel');

const addTransaction = async (req,res)=>{

    try{
        const transaction = await Transaction.create({
            amount: req.body.amount,
            category: req.body.category,
            description: req.body.description,
            userId: req.userId 
        });

        res.json(transaction);
    }

    catch(err){
        res.status(500).json(err);
    }

}

const getTransaction = async (req,res) =>{
    try{
        const transactions = await Transaction.findAll({
            where: { userId: req.userId }
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
                 userId:req.userId
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
