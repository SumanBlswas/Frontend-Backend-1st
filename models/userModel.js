const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  name: String,
  phone: Number,
  password: {
    type: String,
    require: true,
    unique: true,
  },
});

const userModel = mongoose.model("user", userSchema);

module.exports = { userModel };
