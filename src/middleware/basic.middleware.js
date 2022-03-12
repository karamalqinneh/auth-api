"use strict";

const { User } = require("../models/index");
const base64 = require("base-64");

async function basic(req, res, next) {
  const encodedHeaders = req.headers.authorization.split(" ")[1]; // "Basic dGFtaW06cGl6emE="
  const [username, password] = base64.decode(encodedHeaders).split(":"); // spread operator

  const validUser = await User.authenticateBasic(username, password);
  req.user = validUser;
  next();
}

module.exports = basic;
