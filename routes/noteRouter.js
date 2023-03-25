const express = require("express");
const noteRouter = express.Router();
const { noteModel } = require("../models/noteModel");

noteRouter.get("/", async (req, res) => {
  const { userID } = req.body;
  try {
    const notes = await noteModel.find({ userID });
    res.status(200).send(notes);
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

noteRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const note = new noteModel(payload);
    await note.save();
    res.status(200).send({ msg: "A new post added" });
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

noteRouter.patch("/update", async (req, res) => {});

noteRouter.delete("/delete", async (req, res) => {});

module.exports = { noteRouter };
