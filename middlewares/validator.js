const validator = (req, res, next) => {
  const method = req.method;
  const { email, name, phone, password } = req.body;
  if (method === "POST") {
    if (
      typeof email === "string" &&
      //   typeof name === "string" &&
      //   typeof phone === "number" &&
      typeof password === "string"
    ) {
      next();
    } else {
      res.status(404).send({ msg: error.message });
    }
  } else {
    next();
  }
};

module.exports = { validator };
