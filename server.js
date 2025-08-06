// server.js - Secure Basic Server for Windows 7
const express = require("express");
const helmet = require("helmet");
const app = express();
// ===== SECURITY CONFIG ===== //
app.use(helmet()); // Basic security headers
app.disable("x-powered-by"); // Hide Express version
// Rate limiting (100 requests/15min)
const rateLimit = require("express-rate-limit");
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP"
}));
// ===== ROUTES ===== //
app.get("/", (req, res) => {
  res.send(`
    <h1>Genuine Stage</h1>
    <p>Server running on Node.js ${process.version}</p>
    <p>Security Mode: Basic Protection Active</p>
  `);
});
// ===== SERVER START ===== //
const PORT = 3000;
app.listen(PORT, "127.0.0.1", () => { // Only localhost
  console.log(`
  ⚠️  DEVELOPMENT SERVER WARNING ⚠️
  Running on http://localhost:${PORT}
  Node.js: ${process.version}
  DO NOT EXPOSE TO THE INTERNET
  `);
});
// Add after security config
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
// Update home route
app.get("/", (req, res) => {
  res.render("index", { title: "Genuine Stage" });
});
