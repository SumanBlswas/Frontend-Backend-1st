require("dotenv").config();
const mongoose = require("mongoose");

const connection = mongoose.connect(`${process.env.MONGO_LINK}`);

module.exports = { connection };
