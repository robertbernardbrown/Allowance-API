module.exports = function(sequelize, DataTypes) {
  
    var Transaction = sequelize.define("Transaction", {
     
      transactionType: {
        type: DataTypes.STRING,
        allowNull: false
      },
      transactionAmount: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      transactionReceipt: {
        type: DataTypes.STRING,
        allowNull: false
      },
      transactionMonth: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
      
    });
    
    return Transaction;
};