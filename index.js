import express from "express";
const app = express();

app.get("/", (req, res) => {
  const target = req.query.to;
  if (!target) return res.send("Missing ?to=");

  // تبليغ Canary (تلقائي)
  fetch("https://canarytokens.com/feedback/stuff/about/pto4yqknw61cnlabhifjj0nni/submit.aspx")
    .then(() => console.log("Canary triggered."))
    .catch(() => console.log("Canary failed."));

  // إعادة توجيه إلى الرابط الداخلي
  res.redirect(302, target);
});

app.listen(process.env.PORT || 10000, () => {
  console.log("🔥 Server running on port 10000");
});
