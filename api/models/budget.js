module.exports = function(sequelize, DataTypes) {
  
    var Budget = sequelize.define("Budget", {
     
      budget: {
        type: DataTypes.INTEGER
      }
      
    });
    
    return Budget;
};