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
        unique: 'byUser',
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

      Budget.hasMany(models.Transaction, {
        foreignKey: {
          allowNull: false,
          unique: 'byUser'
        }
      })
    };
    
    return Budget;
};