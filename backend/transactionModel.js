const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Transaction = sequelize.define("expense",{

  amount:{
    type: DataTypes.FLOAT,
    allowNull:false
  },

  category:{
    type: DataTypes.STRING
  },

  description:{
    type: DataTypes.STRING
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
  
},
{
  tableName: "expense" 
});

module.exports = Transaction;