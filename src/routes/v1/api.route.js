"use strict";
require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../../models/index");
const bearer = require("../../middleware/bearer.middleware");
const basic = require("../../middleware/basic.middleware");
const router = express.Router();

router.use(express.json());

router.post("/signup", async (req, res) => {
  req.body.password = await bcrypt.hash(req.body.password, 5);
  const record = await User.create(req.body);
  res.status(201).json(record);
});

router.get("/user", bearer, (req, res) => {
  res.json({
    message: "Correct Login",
    user: req.user,
  });
});

router.post("/signin", basic, (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;
