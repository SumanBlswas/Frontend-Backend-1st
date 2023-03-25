require("dotenv").config();
const mongoose = require("mongoose");

const connection = mongoose.connect(`${process.env.MONO_LINK}`);

module.exports = { connection };
