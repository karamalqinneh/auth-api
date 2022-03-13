const express = require("express");
const { User } = require("../../models/index");
const router = express.Router();

router.get("/user", getUsersHandler);
router.get("/user/:id", getSingleUsersHandler);
router.post("/user", newUserHandler);
router.put("/user/:id", updateUserInfoHandler);
router.delete("/user/:id", deleteUserHandler);

// controllers
async function getUsersHandler(req, res) {
  let people = await User.findAll();
  res.status(200).json(people);
}

async function getSingleUsersHandler(req, res) {
  let pid = parseInt(req.params.id);
  let user = await User.findOne({ where: { id: pid } });
  res.json(user);
}

async function newUserHandler(req, res) {
  let newUser = req.body;
  let user = await User.create(newUser);
  res.status(201).json(user);
}
async function updateUserInfoHandler(req, res) {
  let updateInfo = req.body;
  let pid = req.params.id;
  let recordToUpdate = await User.findOne({ where: { id: pid } });
  let updatedUser = await recordToUpdate.update(updateInfo);
  res.status(201).json(updatedUser);
}

async function deleteUserHandler(req, res) {
  let pid = parseInt(req.params.id);
  let user = await User.destroy({ where: { id: pid } });
  res.status(201).json(user);
}

module.exports = router;
