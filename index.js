const http = require('http');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

const targets = [
  'http://127.0.0.1:80',
  'http://localhost:3000',
  'http://169.254.169.254',
  'http://169.254.169.254/latest/meta-data/',
  'http://canarytokens.com/articles/qczfimih1tdawvj4ijjldi9fp/contact.php',
  'http://metadata.google.internal',
];

app.get('/', (req, res) => {
  let index = 0;
  let done = false;

  function tryNext() {
    if (index >= targets.length) {
      if (!done) {
        done = true;
        return res.send('✅ Scanning finished.');
      }
      return;
    }

    const url = targets[index];
    console.log(`🚀 Trying: ${url}`);
    index++;

    const request = http.get(url, (response) => {
      console.log(`✅ SUCCESS: ${url} - Status: ${response.statusCode}`);
      response.on('data', () => {});
      response.on('end', tryNext);
    });

    request.on('error', (err) => {
      console.log(`❌ FAILED: ${url} - ${err.message}`);
      tryNext();
    });

    request.setTimeout(5000, () => {
      console.log(`⏱️ TIMEOUT: ${url}`);
      request.destroy();
      tryNext();
    });
  }

  tryNext();
});

app.listen(PORT, () => {
  console.log(`🔥 Server running at http://localhost:${PORT}`);
});
