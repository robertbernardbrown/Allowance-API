module.exports = function(sequelize, DataTypes) {
  
    var Budget = sequelize.define("Budget", {
     
      budget: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      budgetMonth: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
      
    });
    
    return Budget;
};