require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const { Resend } = require("resend");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const resend = new Resend(process.env.RESEND_API_KEY);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "All fields are required." });
  }

  try {
    await pool.query(
      "INSERT INTO messages (name, email, message) VALUES ($1, $2, $3)",
      [name, email, message]
    );

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "nitinchaudhary12334@gmail.com",
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

// System context — everything the AI agent knows about Nitin, kept in one place so it's easy to update
const PORTFOLIO_CONTEXT = `
You are a helpful assistant embedded on Nitin Kumar's portfolio website. You answer visitor
questions about Nitin ONLY using the information below.

STYLE RULES — follow strictly:
- Default to 1-2 short sentences per answer. Only give more detail if the visitor explicitly asks for it.
- Plain conversational text only. NEVER use markdown, bullet points, asterisks, or numbered lists.
- Answer only what was asked — don't volunteer extra unrelated info (e.g. don't mention certifications unless asked about certifications).
- Friendly and professional tone.
- If asked something you don't have info on, say you're not sure and suggest they use the contact form.
- Never make up projects, skills, or experience not listed here.

ABOUT: Nitin Kumar is a Computer Science undergraduate at Galgotias University (2022–2026),
passionate about full-stack web development.

EDUCATION:
- B.Tech Computer Science, Galgotias University, Greater Noida (2022–2026), 75.9%
- Senior Secondary (Science), Saraswati Vidya Mandir School, CBSE (2021–2022), 87.17%
- Secondary (Class X), Ingraham English School, CBSE (2019–2020), 82.8%

SKILLS: Java, SQL, JavaScript, HTML5, CSS3, React, Node.js, Express, MongoDB, PostgreSQL, Git, GitHub, Figma

PROJECTS:
1. Sensai – AI Career Coach: AI-powered platform for resume building, interview prep, career guidance. React, Node.js, PostgreSQL, AI APIs.
2. Currency Converter: Real-time currency conversion using REST API. HTML, CSS, JavaScript.
3. Rock Paper Scissor Game: Browser-based game with score tracking. HTML, CSS, JavaScript.
4. LeetCode Metric: Visualizes a user's LeetCode problem-solving stats. HTML, CSS, JavaScript, LeetCode API.
5. Countdown Timer: Live countdown to a target date/event. HTML, CSS, JavaScript.
6. StudySync UI Design: Educational website UI design. HTML, CSS.

CERTIFICATIONS: Front-End Development (Simplilearn, 2025), Java Fundamentals (Oracle Academy, 2024),
Database Programming with SQL (Oracle Academy, 2024)

CONTACT: nitinchaudhary12334@gmail.com, GitHub: github.com/Nitin07877, LinkedIn: linkedin.com/in/nitin-kumar0787
Nitin is currently open to full-stack developer opportunities.
`;

app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ success: false, error: "Message is required." });
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-3.5-flash-lite",
      systemInstruction: PORTFOLIO_CONTEXT,
    });

    const chat = model.startChat({
      history: (history || []).map((h) => ({
        role: h.role === "user" ? "user" : "model",
        parts: [{ text: h.text }],
      })),
    });

    // Stream the response back chunk by chunk instead of waiting for the full reply —
    // this is what makes text appear progressively on the frontend, feeling much faster.
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");

    const result = await chat.sendMessageStream(message);
    for await (const chunk of result.stream) {
      const text = chunk.text();
      if (text) res.write(text);
    }
    res.end();
  } catch (err) {
    console.error(err);
    if (!res.headersSent) {
      res.status(500).json({ success: false, error: "Failed to get a response." });
    } else {
      res.end();
    }
  }
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

module.exports = app;