const sqlite = require("sqlite3");
const db = new sqlite.Database("./db/db.dev.sqlite");

//MMMMMMMMM
const mongoose = require("mongoose");
const dev_db_url =
  "mongodb://asterix:asterix42@ds119802.mlab.com:19802/asterix";
const mongoDB = process.env.MONGODB_URI || dev_db_url;
const db = mongoose.connection;

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("DB connection is established");
});
//GGGGGGGGG

module.exports = db;
