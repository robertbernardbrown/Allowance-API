module.exports = function(sequelize, DataTypes) {
  
    var Balance = sequelize.define("Balance", {
     
      balance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isNumeric: true,
        }
      },
      balanceDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            isDate: true,
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
    
    return Balance;
};