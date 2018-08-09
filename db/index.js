const sqlite = require("sqlite3");

const db = new sqlite.Database("./db/db.dev.sqlite");

module.exports = db;
