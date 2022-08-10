require("dotenv").config();
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const auth_token = req.cookies.auth_token;
    if (!auth_token) {
      res.status(401).send({ error: "Please login to continue" });
    } else {
      try {
        const auth_user = jwt.verify(auth_token, process.env.JWT_SECRET);
        next();
      } catch (error) {
        res.status(401).send({ error: "Please login to continue" });
      }
    }
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
};

module.exports = auth;
