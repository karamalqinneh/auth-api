"use strict";
const { User } = require("../models/index");

async function bearer(req, res, next) {
  const bearerHeaderToken = req.headers.authorization.split(" ")[1];
  const userData = await User.authenticateBearer(bearerHeaderToken);
  req.user = userData;
  next();
}

module.exports = bearer;
