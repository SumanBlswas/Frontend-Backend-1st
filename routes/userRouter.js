const express = require("express");
const jwt = require("jsonwebtoken");
const { userModel } = require("../models/userModel");
const bcrypt = require("bcrypt");
const { validator } = require("../middlewares/validator");

const userRouter = express.Router();
userRouter.use(validator);

userRouter.get("/", async (req, res) => {
  try {
    let user = await userModel.find();
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

userRouter.post("/register", async (req, res) => {
  const { email, password, name, phone } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      let user = new userModel({ email, password: hash, name, phone });
      await user.save();
      res.status(200).send({ msg: "a new user has been added" });
    });
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

// userRouter.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     let user = await userModel.find({ email });
//     user.length > 0
//       ? bcrypt.compare(password, user[0].password, (err, result) => {
//           if (result) {
//             res.status(200).send({
//               msg: "Login successfull",
//               token: jwt.sign(
//                 {
//                   userID: user[0]._id,
//                   exp: Math.floor(Date.now() / 1000) + 60 * 60,
//                 },
//                 "bruce"
//               ),
//             });
//           } else {
//             res.status(404).send({ msg: "Wrong Credential" });
//           }
//         })
//       : res.status(404).send({ msg: "Login failed" });
//   } catch (error) {
//     res.status(404).send({ msg: error.message });
//   }
// });

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await userModel.find({ email });
    if (user.length > 0) {
      const passwordMatch = await bcrypt.compare(password, user[0].password);
      if (passwordMatch) {
        const token = jwt.sign(
          {
            userID: user[0]._id,
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
          },
          "bruce"
        );
        res.status(200).send({
          msg: "Login successful",
          token: token,
        });
      } else {
        res.status(401).send({ msg: "Wrong credentials" });
      }
    } else {
      res.status(401).send({ msg: "Wrong credentials" });
    }
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

// userRouter.get("/details", (req, res) => {
//   const { token } = req.query;
//   try {
//     jwt.verify(token, "bruce", (err, decoded) => {
//       decoded
//         ? res.status(200).send("userdetails")
//         : res.status(404).send("restricted userdetails");
//     });
//   } catch (error) {
//     res.status(404).send({ msg: error.message });
//   }
// });

userRouter.patch("/updates/:userID", async (req, res) => {
  const { userID } = req.params;
  const payload = req.body;
  try {
    await userModel.findByIdAndUpdate({ _id: userID }, payload);
    res.status(200).send({ msg: `user ${userID} has been updated` });
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

userRouter.delete("/delete/:userID", async (req, res) => {
  let { userID } = req.params;
  try {
    await userModel.findByIdAndDelete({ _id: userID });
    res.status(200).send({ msg: `this ${userID} user has been removed` });
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

userRouter.get("/:userID", async (req, res) => {
  const { userID } = req.params;
  try {
    let user = await userModel.findById({ _id: userID });
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

module.exports = { userRouter };
