const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  title: String,
  body: String,
  sub: String,
  userID: String,
});

const noteModel = mongoose.model("note", noteSchema);

module.exports = { noteModel };
