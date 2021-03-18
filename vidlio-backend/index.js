const winston = require("winston");
const express = require("express");
const config = require("config");
const app = express();
// "port": "3900"

require("./startup/logging")();
require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const port = process.env.PORT || config.get("port");
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);

module.exports = server;
