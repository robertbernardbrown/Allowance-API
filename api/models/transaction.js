module.exports = function(sequelize, DataTypes) {
  
    var Transaction = sequelize.define("Transaction", {
     
      transactionType: {
        type: DataTypes.STRING
      },
      transactionAmount: {
        type: DataTypes.INTEGER
      }
      
    });
    
    return Transaction;
};