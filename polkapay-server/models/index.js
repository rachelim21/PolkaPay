// require the node packages
var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var dbConfig  = require("../config/db.config.js");

// set a reference to this file's name so we can exclude it later
var basename  = path.basename(__filename);

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = require(path.join(__dirname, file))(sequelize, Sequelize) // sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db.sequelize.models).forEach(modelName => {
  if (db.sequelize.models[modelName].associate) {
    db.sequelize.models[modelName].associate(db.sequelize.models);
  }
});

module.exports = db;