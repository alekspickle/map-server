const bCrypt = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const saltRounds = 10;



let UserSchema = new Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true, max: 100 },
    password: { type: String, required: true, min: 8 }
  },
  { timestamps: true }
);

UserSchema.pre("save", next => {
  bCrypt.hash(user.password, saltRounds).then(hash => (user.password = hash));
  next();
});

module.exports = mongoose.model("User", UserSchema);
