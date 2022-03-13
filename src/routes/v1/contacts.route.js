const express = require("express");
const { Contact } = require("../../models/index");
const router = express.Router();

router.get("/contact", getUsersHandler);
router.get("/contact/:id", getSingleUsersHandler);
router.post("/contact", newUserHandler);
router.put("/contact/:id", updateUserInfoHandler);
router.delete("/contact/:id", deleteUserHandler);

// controllers
async function getUsersHandler(req, res) {
  let people = await Contact.findAll();
  res.status(200).json(people);
}

async function getSingleUsersHandler(req, res) {
  let pid = parseInt(req.params.id);
  let user = await Contact.findOne({ where: { id: pid } });
  res.json(user);
}

async function newUserHandler(req, res) {
  let newUser = req.body;
  let user = await Contact.create(newUser);
  res.status(201).json(user);
}
async function updateUserInfoHandler(req, res) {
  let updateInfo = req.body;
  let pid = req.params.id;
  let recordToUpdate = await Contact.findOne({ where: { id: pid } });
  let updatedUser = await recordToUpdate.update(updateInfo);
  res.status(201).json(updatedUser);
}

async function deleteUserHandler(req, res) {
  let pid = parseInt(req.params.id);
  let user = await Contact.destroy({ where: { id: pid } });
  res.status(201).json(user);
}

module.exports = router;
