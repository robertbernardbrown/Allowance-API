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
      budgetMonth: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        validate: {
            max: 11,
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
    
    return Budget;
};