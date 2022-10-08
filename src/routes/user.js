require("dotenv").config();
const express = require("express");
const router = new express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

// Route for creating a user (signup)
router.post(
  "/signup",
  body("name").exists(),
  body("user_name").isLength({ min: 5 }),
  body("email").isEmail(),
  body("password").exists(),
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // const auth_token = req.cookies.auth_token;
    // if (auth_token) {
    //   res.status(403).send({ error: "You are already signed in!" });
    // }

    const { name, user_name, email, password, confirm_password } = req.body;
    try {
      try {
        if (password === confirm_password) {
          const salt = await bcrypt.genSalt(10);
          const hashed_password = await bcrypt.hash(password, salt);
          const user = new User({
            name,
            user_name,
            email,
            password: hashed_password,
            confirm_password: hashed_password,
          });
          await user.save();
          res.status(201).send({ message: "User created successfully" });
        } else {
          res.status(401).send({ error: "Passwords are not matching" });
        }
      } catch (error) {
        res
          .status(406)
          .send(
            error.keyValue.user_name
              ? `username ${error.keyValue.user_name} already exists`
              : `${error.keyValue.email} already exists`
          );
      }
    } catch (error) {
      res.status(500).send({ error: "Internal server error" });
      console.log(error);
    }
  }
);

// Route for user login
router.post(
  "/login",
  body("email").exists(),
  body("email").isEmail(),
  body("password").exists(),
  body("password").isLength({ min: 1 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      try {
        const { email, password } = req.body;
        const user = await User.find({ email });

        if (user.length !== 0 || user === undefined) {
          const verifyUser = await bcrypt.compare(password, user[0].password);
          if (verifyUser) {
            const auth_token = await jwt.sign(
              { _id: user[0]._id, email },
              process.env.JWT_SECRET
            );
            res.cookie("auth_token", auth_token, {
              expires: new Date(Date.now() + 60000 * 30),
              httpOnly: true,
              secure: true,
            });
            res.status(200).send({ message: "Login successfull" });
          } else {
            res.status(406).send({ error: "Invalid email or password" });
          }
        } else {
          res.status(406).send({ message: "Invalid email or password" });
        }
      } catch (error) {
        res.status(406).send({ error: "Invalid email or password" });
      }
    } catch (error) {
      res.status(500).send({ error: "Internal server error" });
    }
  }
);

router.get("/logout", async (req, res) => {
  try {
    res.clearCookie("auth_token");
    res.status(200).send({ message: "Logout successfull" });
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

module.exports = router;
