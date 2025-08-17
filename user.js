const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true }, // hashed
  role: { type: String, enum: ["freelancer","agency"], default: "freelancer" }
}, { timestamps: true });

userSchema.index({ email: 1 }, { unique: true });
module.exports = mongoose.model("User", userSchema);
