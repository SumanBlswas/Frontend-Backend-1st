const jwt = require("jsonwebtoken");

const checker = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    const decoded = jwt.verify(token, "bruce");
    if (decoded) {
      req.body.userID = decoded.userID;
      next();
    } else {
      res.status(404).send({ msg: "pls login first" });
    }
  } else {
    res.status(404).send({ msg: "pls login first" });
  }
};

module.exports = { checker };
