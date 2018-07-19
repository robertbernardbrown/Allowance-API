module.exports = function(sequelize, DataTypes) {
  
    var Balance = sequelize.define("Balance", {
     
      balance: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      balanceMonth: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
      
    });
    
    return Balance;
};