"use strict";
require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../../models/index");
const bearer = require("../../middleware/bearer.middleware");
const basic = require("../../middleware/basic.middleware");
const acl = require("../../middleware/acl.middleware");
const router = express.Router();

router.use(express.json());

router.post("/signup", async (req, res) => {
  req.body.password = await bcrypt.hash(req.body.password, 5);
  const record = await User.create(req.body);
  res.status(201).json({ id: record.username, token: record.token });
});

router.post("/signin", basic, (req, res) => {
  res.status(200).json(req.user);
});
router.get("/secret", bearer, async (req, res) => {
  let usersList = await User.findAll();
  res.status(200).json(usersList);
});

router.get("/user", bearer, acl("delete"), (req, res) => {
  res.json({
    message: "Correct Login",
    user: req.user,
  });
});

module.exports = router;
