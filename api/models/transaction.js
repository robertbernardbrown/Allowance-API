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
    });

    Transaction.associate = function(models) {
      Transaction.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
          unique: 'byUser'
        }
      });

      Transaction.belongsTo(models.Budget, {
        foreignKey: {
          allowNull: false,
          unique: 'byUser'
        }
      });
    }
    
    return Transaction;
};