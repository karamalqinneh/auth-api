"use strict";

const express = require("express");
const bearer = require("../../middleware/bearer.middleware");
const acl = require("../../middleware/acl.middleware");
const router = express.Router();

router.use(express.json());

router.get("/salesData", bearer, acl("read"), (req, res) => {
  res.send("You have access to read this data");
});
router.post("/salesData", bearer, acl("create"), (req, res) => {
  res.send("You have access to update this data");
});
router.put("/salesData", bearer, acl("update"), (req, res) => {
  res.send("You have access to edit this data");
});
router.patch("/salesData", bearer, acl("update"), (req, res) => {
  res.send("You have access to edit2 this data");
});
router.delete("/salesData", bearer, acl("delete"), (req, res) => {
  res.send("You have access to delete this data");
});

module.exports = router;
