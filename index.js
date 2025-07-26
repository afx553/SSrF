// ssrf-curl.js
const express = require("express");
const { exec } = require("child_process");
const app = express();
const PORT = process.env.PORT || 10000;

// رابط canarytoken الخاص فيك
const TARGET_URL = "http://canarytokens.com/terms/articles/traffic/10vejiikmwbx2tca01zxf62vv/post.jsp";

app.get("/ssrf/pings", (req, res) => {
  const cmd = `curl -s ${TARGET_URL}`;
  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.error("❌ Error running curl:", err);
      res.status(500).send("Curl execution failed.");
      return;
    }

    console.log("✅ Curl sent to:", TARGET_URL);
    res.send(`<h2>🔁 Sent curl to: ${TARGET_URL}</h2>`);
  });
});

app.listen(PORT, () => {
  console.log(`🔥 Server running at http://localhost:${PORT}`);
});
