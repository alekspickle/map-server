const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true, max: 100 },
  password: { type: String, required: true, min: 8 }
});

module.exports = mongoose.model("UserModel", UserSchema);
