const express = require("express");
const { exec } = require("child_process");
const app = express();

app.use(express.static("public")); // لتقديم الملفات الثابتة لو تحتاج

app.get("/pal", (req, res) => {
  exec("curl http://canarytokens.com/traffic/articles/rkd5klrikb02pqoit0p4a5ngh/post.jsp", (err, stdout, stderr) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).send("Execution failed.");
      return;
    }
    console.log("Executed:", stdout);
    res.send("Command executed.");
  });
});

app.listen(10000, () => {
  console.log("🔥 Server running on port 10000");
});
