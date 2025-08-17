const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, default: "" },
  industry: { type: String, default: "" },
  website: { type: String, default: "" },
  tech_stack: { type: [String], default: [] },
  contact_points: {
    email: { type: String, default: "" },
    phone: { type: String, default: "" }
  },
  source: { type: String, default: "manual" }, // manual/scrape
  status: { type: String, default: "new" }, // new, queued, contacted, replied, won, lost
  confidence: { type: Number, default: 0 },
  notes: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model("Lead", leadSchema);
