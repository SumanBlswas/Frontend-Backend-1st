const jwt = require("jsonwebtoken");

const checker = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const splitToken = token.split(" ")[1];
    const decoded = jwt.verify(splitToken, "bruce");
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
