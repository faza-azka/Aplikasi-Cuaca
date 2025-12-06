// Simple test server
const express = require("express");
const path = require("path");

const app = express();
const PORT = 4000;

// Static files
app.use(express.static(path.join(__dirname, "../public")));

// Simple test route
app.get("/test", (req, res) => {
  res.json({
    message: "Server is working!",
    timestamp: new Date().toISOString(),
  });
});

// Home route
app.get("/", (req, res) => {
  res.send('<h1>Server Running!</h1><p><a href="/test">Test API</a></p>');
});

app.listen(PORT, () => {
  console.log(`✅ Test server running on http://localhost:${PORT}`);
  console.log("Try: http://localhost:4000/test");
});
