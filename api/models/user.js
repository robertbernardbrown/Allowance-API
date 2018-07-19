module.exports = function(sequelize, DataTypes) {
  
    var User = sequelize.define("User", {
     
      userName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
      },
      userPassword: {
        type: DataTypes.STRING,
        allowNull: false
      }
      
    });
    
    return User;
};