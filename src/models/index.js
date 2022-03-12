"use strict";

require("dotenv").config();
const user = require("./users.model");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL);

module.exports = {
  database: sequelize,
  User: user(sequelize, DataTypes),
};
