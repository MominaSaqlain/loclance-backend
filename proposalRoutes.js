const express = require("express");
const axios = require("axios");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/generate", auth, async (req, res) => {
  const { leadId, prompt, tone = "professional" } = req.body;
  try {
    // If you have OPENAI_API_KEY set, call OpenAI; otherwise return a stub text
    if (!process.env.OPENAI_API_KEY) {
      const sample = `Hello ${prompt?.clientName || "Client"},\n\nWe are excited to offer... (stub)`;
      return res.json({ text: sample });
    }

    const resp = await axios.post("https://api.openai.com/v1/chat/completions", {
      model: "gpt-4o-mini", // or gpt-4o etc.
      messages: [{ role: "user", content: prompt || "Write a proposal" }],
      max_tokens: 500
    }, {
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }
    });

    const text = resp.data.choices?.[0]?.message?.content || "No output";
    res.json({ text });
  } catch (err) {
    console.error(err.response?.data || err);
    res.status(500).json({ error: "OpenAI request failed" });
  }
});

module.exports = router;
