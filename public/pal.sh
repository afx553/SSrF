
#!/bin/bash

# تنفيذ طلب إلى رابط Canary للإثبات
curl https://canarytokens.com/feedback/traffic/tags/hz1zoj8urw1mikvvhr3owvqa8/index.html

# أو كبديل: طلب إلى سيرفرك الخاص لو عندك
# curl https://your-server.com/ssrf-ping

# أو خيار ثالث: إرسال ping إلى خادم داخلي (لو بدك تشوف هل TikTok تقدر توصله)
# ping -c 1 169.254.169.254
