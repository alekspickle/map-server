"use strict";
const bCrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  const saltRounds = 10;

  const classMethods = {
    associate: models => {
      models.User.hasMany(models.Location);
    }
  };

  const instanceMethods = {
    checkPassword: (passwordToCheck, hashPassword, cb) => {
      bCrypt.compare(passwordToCheck, hashPassword, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
      });
    }
  };

  const model = {
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        isEmail: true,
        len: [3, 10]
      }
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        len: {
          args: 5,
          msg: "Name must be atleast 5 characters in length"
        },
        isAlphanumeric: true,
        notEmpty: true
      },
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        len: {
          args: 8,
          msg: "Password must be atleast 8 characters in length"
        }
      },
      allowNull: false
    }
  };

  const User = sequelize.define("User", model, {
    classMethods,
    instanceMethods
  });

  User.beforeCreate(user => {
    return bCrypt
      .hash(user.password, saltRounds)
      .then(hash => (user.password = hash));
  });

  return User;
};
