const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

function generateToken(user) {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d"
  });
}

// REGISTER
router.post("/register",
  [
    body("name").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: errors.array()[0].msg });

    try {
      const { name, email, password, role } = req.body;
      const exists = await User.findOne({ email });
      if (exists) return res.status(400).json({ error: "Email already registered" });

      const hash = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hash, role });
      const token = generateToken(user);
      return res.status(201).json({ message: "Registered", user: { id: user._id, name, email, role }, token });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }
  });

// LOGIN
router.post("/login",
  [ body("email").isEmail(), body("password").isLength({ min: 6 }) ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: "Invalid credentials" });

    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: "Invalid email or password" });

      const ok = await bcrypt.compare(password, user.password);
      if (!ok) return res.status(400).json({ error: "Invalid email or password" });

      const token = generateToken(user);
      return res.json({ message: "Logged in", token, user: { id: user._id, name: user.name, email: user.email }});
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  });

module.exports = router;
