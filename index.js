// index.js
const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(10000, () => {
  console.log("🔥 Server running at http://localhost:10000");
});
