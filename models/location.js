"use strict";
module.exports = (sequelize, DataTypes) => {
  const classMethods = {
    associate: models => {
      models.Location.belongsTo(models.User, {
        onDelete: "CASCADE",
        foreignKey: {
          allowNull: false
        }
      });
    }
  };
  const model = {
    name: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true
        },
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        validate: {
            isAlphanumeric: true
        }
    },
    lat: {
        type: DataTypes.DECIMAL(20, 10),
        validate: {
            isFloat: true,
            notEmpty: true
        },
        allowNull: false,
    },
    lng: {
        type: DataTypes.DECIMAL(20, 10),
        validate: {
            isFloat: true,
            notEmpty: true
        },
        allowNull: false,
    },
};
  const Location = sequelize.define("Location", model, {classMethods});
  return Location;
};
