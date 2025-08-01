// index.js
const express = require("express");
const app = express();
app.use(express.text({ type: "*/*" }));

app.all("*", (req, res) => {
  console.log("[+] New request from:", req.ip);
  console.log("[+] Headers:", req.headers);
  console.log("[+] Body:", req.body);
  res.send("Logged");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port", PORT));
