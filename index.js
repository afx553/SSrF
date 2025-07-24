const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 10000;

app.get('/proxy', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send('Missing URL');

  try {
    const response = await fetch(url);
    const text = await response.text();

    console.log(`[SSRF] Requested: ${url}`);
    console.log(`[SSRF] Response:\n${text}`);  // ⬅️ يطبع محتوى الصفحة

    res.send(text);
  } catch (error) {
    console.error(`[SSRF] Error requesting ${url}:`, error);
    res.status(500).send('Error');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
