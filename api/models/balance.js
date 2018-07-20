module.exports = function(sequelize, DataTypes) {
  
    var Balance = sequelize.define("Balance", {
     
      balance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isNumeric: true,
        }
      },
      balanceMonth: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isNumeric: true,
        }
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
      
    });
    
    return Balance;
};