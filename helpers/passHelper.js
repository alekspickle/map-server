const bCrypt = require("bcrypt");

module.exports = (passwordToCheck, hashPassword, cb) => {
    bCrypt.compare(passwordToCheck, hashPassword, (err, isMatch) => {
      if (err) return cb(err);
      cb(null, isMatch);
    });
  };