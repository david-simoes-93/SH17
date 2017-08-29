from flask import Flask, render_template, request
from flask_sse import sse

app = Flask(__name__)
app.config["REDIS_URL"] = "redis://localhost"
app.register_blueprint(sse, url_prefix='/stream')



@app.route('/')
def index():
    return render_template("index1.html")


@app.route('/hello')
def publish_hello():
    msg = request.args.get('msg', 'Hello!')
    sse.publish({"message": msg}, type='greeting')
    return "Message sent!"