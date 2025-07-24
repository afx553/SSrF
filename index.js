const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/', (req, res) => res.send('SSRF Proxy Online!'));

app.get('/proxy', async (req, res) => {
  try {
    const url = req.query.url || 'http://169.254.169.254/latest/meta-data/';
    const response = await fetch(url);
    const text = await response.text();
    console.log('[SSRF] Requested:', url);
    res.send(`<pre>${text}</pre>`);
  } catch (err) {
    res.status(500).send('Error: ' + err.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server listening on port', PORT));
