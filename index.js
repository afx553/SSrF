import express from "express";
const app = express();

app.get("/", (req, res) => {
  const target = req.query.to;
  if (!target) return res.send("Missing ?to=");

  res.redirect(302, target);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("SSRF redirect ready.");
});
