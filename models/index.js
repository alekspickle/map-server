"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require("../config");
const db = {};

let sequelize;

if (config.get("use_env_variable") && env === "production") {
  sequelize = new Sequelize(process.env[config.get("use_env_variable")]);
} else {
  sequelize = new Sequelize('mainDB', null, null,{
    dialect: config.get("development").dialect,
    storage: config.get("development").storage
  });
}

sequelize
  .authenticate()
  .then(function(err) {
    console.log('DB connection has been established successfully.');
  }, function (err) {
    console.log('Unable to connect to the database:', err);
  });

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    const model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
