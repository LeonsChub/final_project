const express = require("express");
const router = express.Router();

require("dotenv").config();
const User = require("../Models/User");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
// const auth = require("../middleware/auth");

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!(email && password && username) || req.body === undefined) {
      res.status(400).send("Make sure fields are properly filled out");
    } else {
      const oldUser = await User.findOne({ email });

      if (oldUser) {
        return res.status(409).send("User already exists");
      }
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const user = await User.create({
        username: username,
        email: email.toLowerCase(),
        password: hash,
      });

      await user.save();

      res.status(201).json(user);
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.toLowerCase();

    if (!(email && password)) {
      res.status(400).send("All fields required");
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, username: user.username },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      user.token = token;

      res.status(200).json(token);
    } else {
      res.status(400).send("Invalid Credential");
    }
  } catch (err) {
    console.log(err);
    res.status(418);
  }
});

module.exports = router;
