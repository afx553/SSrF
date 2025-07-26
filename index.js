const express = require("express");
const app = express();

app.use(express.static("public")); // يقدم ملفات من public/

app.listen(10000, () => {
  console.log("🔥 Server running on port 10000");
});
