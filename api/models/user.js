module.exports = function(sequelize, DataTypes) {
  
    var User = sequelize.define("User", {
     
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        },
        unique: true
      },
      userPassword: {
        type: DataTypes.STRING,
        allowNull: false
      }
      
    });
    
    return User;
};