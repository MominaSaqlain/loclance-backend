const express = require("express");
const { body, validationResult } = require("express-validator");
const Lead = require("../models/Lead");
const auth = require("../middleware/auth");

const router = express.Router();

// Create lead (protected)
router.post("/",
  auth,
  [
    body("name").notEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: errors.array()[0].msg });
    try {
      const data = req.body;
      const lead = await Lead.create(data);
      res.status(201).json({ lead });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  });

// List leads (protected) with simple filters
router.get("/", auth, async (req, res) => {
  try {
    const { city, q, status, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (city) filter.city = city;
    if (status) filter.status = status;
    if (q) filter.$or = [{ name: { $regex: q, $options: "i" } }, { website: { $regex: q, $options: "i" } }];
    const leads = await Lead.find(filter).sort({ createdAt: -1 }).limit(parseInt(limit)).skip((page - 1) * limit);
    res.json({ leads });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get single lead
router.get("/:id", auth, async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ error: "Not found" });
    res.json({ lead });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Update lead
router.put("/:id", auth, async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ lead });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Delete lead
router.delete("/:id", auth, async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
