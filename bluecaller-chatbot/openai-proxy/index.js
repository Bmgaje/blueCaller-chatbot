// index.js - OpenAI Proxy Server

const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

// ✅ Ensure API Key exists before starting
if (!process.env.OPENAI_API_KEY) {
  console.error("❌ Missing OPENAI_API_KEY in environment variables.");
  process.exit(1);
}

const app = express();

// ✅ Restrict CORS to your frontend in production
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*", // Set CLIENT_URL in Render for security
  })
);
app.use(express.json());

// 📌 Health Check Route
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "OpenAI proxy is running" });
});

// 📌 Chat Endpoint
app.post("/chat", async (req, res) => {
  try {
    const messages = req.body.messages;

    if (!messages || !Array.isArray(messages)) {
      return res
        .status(400)
        .json({ error: "Invalid request: 'messages' must be an array." });
    }

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 15000, // ⏳ 15s timeout to prevent hanging
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error("OpenAI Proxy Error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Error from OpenAI proxy",
      details: err.response?.data || err.message,
    });
  }
});

// 🚀 Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ OpenAI proxy running on port ${PORT}`));
