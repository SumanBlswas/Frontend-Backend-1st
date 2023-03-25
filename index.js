const express = require("express");
const { connection } = require("./config/db");
// const { validator } = require("./middlewares/validator");
const { userRouter } = require("./routes/userRouter");
const { noteRouter } = require("./routes/noteRouter");
const { checker } = require("./middlewares/checker");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("Hello! Welcome Home!");
});

app.use("/users", userRouter);
app.use(checker);
app.use("/notes", noteRouter);

app.listen(process.env.PORT_LINK, async () => {
  try {
    await connection;
    console.log(`db is connected at port ${process.env.PORT_LINK}`);
  } catch (error) {
    console.log({ msg: "Problem in the server or db" });
  }
});
