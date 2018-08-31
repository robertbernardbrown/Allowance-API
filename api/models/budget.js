module.exports = function(sequelize, DataTypes) {
  
    var Budget = sequelize.define("Budget", {
     
      budget: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
        validate: {
            isNumeric: true,
        }
      },
      budgetDate: {
        type: DataTypes.DATEONLY,
        unique: true,
        allowNull: false,
        validate: {
            isDate: true,
        }
      }
    });

    Budget.associate = function(models) {
      Budget.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
          unique: 'byUser'
        }
      });
    };
    
    return Budget;
};