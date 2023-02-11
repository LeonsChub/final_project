const express = require("express");
const verifyUser = require('../../middlewares/verifyUser')
const router = express.Router();
require("dotenv").config();
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const decode = require("jwt-decode");
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
        chips: 5000,
      });

      const token = jwt.sign(
        { user_id: user._id, username: user.username },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      await user.save();

      res.status(201).json(token);
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

router.get("/chips", verifyUser, async (req, res) => {
  try {
    const token = req.headers.authorization.substring(7);
    const { user_id } = decode(token);
    const { chips } = await User.findById(user_id);
    res.status(200).json(chips);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/chips", async (req, res) => {
  try {
    const body = req.body;
    const token = req.headers.authorization.substring(7);
    const { user_id } = decode(token);
    const results = await User.findByIdAndUpdate(user_id, body);
    console.log(results);
    res.status(200).json(results.chips);
  } catch (e) {
    console.log(1);
    res.status(400).send(e);
  }
});

module.exports = router;
