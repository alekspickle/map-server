const express = require("express");
const app = express();
const middleware = require('./middleware')(app, express)


module.exports = app;
