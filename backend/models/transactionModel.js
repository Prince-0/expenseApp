const { DataTypes } = require("sequelize");
const sequelize = require("../db");

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
  }
  
},
  {
    tableName: "expense" ,
    timestamps: false
  }
  
);

module.exports = Transaction;