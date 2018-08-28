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
      transactionDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            isDate: true,
        },
        foreignKey: true,
        references: {
          model: "Budgets",
          key: 'budgetDate',
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
          model: "Users",
          key: 'id',
        },
      }
      
    });
    
    return Transaction;
};