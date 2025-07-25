const express = require('express');
const app = express();

app.get('/proxy', (req, res) => {
  const target = req.query.url;
  res.redirect(302, target);  // هذا يسوي redirect مباشر
});

app.listen(10000, () => {
  console.log('Server listening on port 10000');
});
