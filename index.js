const express = require("express");
const { exec } = require("child_process");
const app = express();

const PORT = 10000;

// توليد رابط canary جديد تلقائي (أنت بدّله بروابطك الجاهزة إذا تحب)
function generateCanaryToken() {
  // مثال: رابط redirect سريع من canarytokens
  return "http://canarytokens.com/images/about/a57ijqi2n5uzs2o8y3h2oc8p6/contact.php";
}

// كل مرة يولّد مسار عشوائي جديد
app.get("/ssrf/:id", (req, res) => {
  const tokenUrl = generateCanaryToken(); // غيره لو حبيت تجرب على metadata مثلاً

  exec(`curl ${tokenUrl}`, (err, stdout, stderr) => {
    if (err) {
      console.error("Error executing curl:", err);
    } else {
      console.log(`✅ Curl fired to: ${tokenUrl}`);
    }
  });

  res.send(`<h1>📡 SSRF Triggered for ID: ${req.params.id}</h1>`);
});

// تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`🔥 Server running at http://localhost:${PORT}`);
});
