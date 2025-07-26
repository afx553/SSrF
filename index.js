const express = require("express");
const { exec } = require("child_process");
const app = express();

app.use(express.static("public")); // يخدم الملفات الثابتة لو عندك

// ✅ هذا هو الرابط اللي ينفذ الأمر فعليًا
app.get("/pal", (req, res) => {
  exec("curl http://canarytokens.com/stuff/about/feedback/no6x64yxk4is7r41q06xd137i/payments.js, (err, stdout, stderr) => {
    if (err) {
      console.error("Error:", err);
      return res.status(500).send("Failed to trigger Canary");
    }
    res.send("✅ Canary ping sent!");
  });
});

app.listen(10000, () => {
  console.log("🔥 Server running on port 10000");
});
