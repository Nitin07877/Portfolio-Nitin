require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const { Resend } = require("resend");

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const resend = new Resend(process.env.RESEND_API_KEY);

app.get("/", (req, res) => {
  res.send("Server is running! Updated.");
});

app.get("/api/projects", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM projects ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get("/api/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ success: true, time: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// New: contact form submission
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "All fields are required." });
  }

  try {
    // 1. Save to database first — so we never lose a message even if email fails
    await pool.query(
      "INSERT INTO messages (name, email, message) VALUES ($1, $2, $3)",
      [name, email, message]
    );

    // 2. Send yourself an email via Resend
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "nitinchaudhary12334@gmail.com", // replace with your actual email
      subject: `New message from ${name}`,
      html: `
        <h3>New contact form submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = app;