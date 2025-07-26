// index.js
const express = require("express");
const { exec } = require("child_process");
const app = express();

app.get("/pal", (req, res) => {
  exec("curl http://169.254.169.254", (err, stdout, stderr) => {
    console.log("Request fired");
  });

  res.send(`<h1>SSRF Canaryping</h1>`);
});

app.listen(10000, () => console.log("🔥 Listening on 10000"));
