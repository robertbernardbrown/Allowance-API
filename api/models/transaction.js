module.exports = function(sequelize, DataTypes) {
  
    var Transaction = sequelize.define("Transaction", {
     
      transactionType: {
        type: DataTypes.STRING,
        allowNull: false
      },
      transactionAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isNumeric: true,
        }
      },
      transactionReceipt: {
        type: DataTypes.STRING,
        allowNull: false
      },
      transactionMonth: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isNumeric: true,
        }
      },
      userId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        references: {
          model: "Users",
          key: 'id',
        },
        allowNull: false
      }
      
    });
    
    return Transaction;
};