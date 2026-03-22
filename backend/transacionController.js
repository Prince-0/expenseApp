const Transaction = require('./transactionModel');

const addTransaction = async (req,res)=>{

    try{
        const transaction = await Transaction.create(req.body);
        res.json(transaction);
    }

    catch(err){
        res.status(500).json(err);
    }

}

const getTransaction = async (req,res) =>{
    try{
        const transactions = await Transaction.findAll();
        res.json(transactions);   
    }
    catch(err){
        res.status(500).json(err);
    }
    
}

const deleteTransaction = async(req,res)=>{
    try{
        await Transaction.destroy({
            where:{ id:req.params.id }
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
