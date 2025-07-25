const express = require('express');
const app = express();
const port = 10000;

app.get('/proxy', (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send('Missing ?url=');
  res.redirect(302, url); // ← هذا يسوي redirect فقط
});

app.listen(port, () => {
  console.log(`Redirect server running on port ${port}`);
});
