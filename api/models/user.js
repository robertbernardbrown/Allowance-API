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
        },
        unique: true
      },
      userPassword: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });

    User.associate = function(models) {
      User.hasMany(models.Budget, {
        onDelete: 'cascade',
      })

      User.hasMany(models.Transaction, {
        onDelete: 'cascade',
      })
    }
    
    return User;
};