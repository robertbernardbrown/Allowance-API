"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || "development";
var config = require(__dirname + "/../config/config.json")[env];
var db = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], {logging: false});
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config, {logging: false});
}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js");
  })
  .forEach(function(file) {
    var model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// db.User.hasMany(db.Budget, {foreignKey: 'userId'});
// db.Budget.belongsTo(db.User, {foreignKey: 'userId'});

db.Budget.hasMany(db.Transaction, {foreignKey: 'transactionDate', sourceKey: 'budgetDate'});
// db.Transaction.belongsTo(db.Budget, {foreignKey: 'id'});

// db.User.hasMany(db.Transaction, {foreignKey: 'id'});
// db.Transaction.belongsTo(db.User, {foreignKey: 'id'});


module.exports = db;