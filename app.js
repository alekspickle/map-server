const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");
const errorHandler = require("./error_handler")(app);
const mongoose = require("mongoose");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//connect mongoose ODM to remote MongoDB
const dev_db_url =
  "mongodb://asterix:asterix42@ds119802.mlab.com:19802/asterix";
const mongoDB = process.env.MONGODB_URI || dev_db_url;
const db = mongoose.connection;

mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("DB connection is established");
});
//

app.use("/", routes);
app.use(errorHandler);

module.exports = app;
