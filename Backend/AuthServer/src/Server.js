const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");

const pool = require("./config/db");
const { redis } = require("./config/redis");

const app = express();

// ✅ CORS (IMPORTANT)
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://your-vercel-url.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());


// ========================
// 🔐 LOGIN (DB BASED)
// ========================
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    return res.json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        name: user.full_name
      }
    });

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// ========================
// 🧪 TEST ROUTE
// ========================
app.get("/auth/me", (req, res) => {
  res.json({ message: "Auth working" });
});


// ========================
// HEALTH CHECK
// ========================
app.get("/", (req, res) => {
  res.send("Auth Server Running 🚀");
});


// ========================
// SERVER START
// ========================
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Auth Server running on ${PORT}`);
});