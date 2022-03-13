const express = require("express");
const notFoundHandler = require("./error-handlers/404");
const errorHandler = require("./error-handlers/500");
const apiRoute = require("./routes/auth/api.route");
const authRoute = require("./routes/v2/auth.route");
const modelRoute = require("./routes/v1/contacts.route");

// express app
const app = express();

// connect to sequelize & listen for requests
const start = (port) => {
  app.listen(port, () => console.log(`Running on Port ${port}`));
};

// middleware & static files
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("server is up and running");
});

app.use(apiRoute);
app.use(authRoute);
app.use(modelRoute);

app.use("*", notFoundHandler);
app.use(errorHandler);

module.exports = {
  app: app,
  start: start,
};
