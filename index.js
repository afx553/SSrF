# app.py
from flask import Flask, request
app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    print(f"[+] New Request from: {request.remote_addr}")
    print(f"[+] Headers: {dict(request.headers)}")
    print(f"[+] Body: {request.data.decode()}")
    return "OK", 200
