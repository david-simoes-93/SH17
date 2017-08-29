# -*- coding: utf-8 -*-

from flask import Flask, jsonify, render_template, request
from flask_sse import sse


app = Flask(__name__)
app.config["REDIS_URL"] = "redis://localhost"
app.register_blueprint(sse, url_prefix='/stream')


@app.route('/dashboard')
def dashboard():
    return render_template("dashboard.html")


@app.route('/hello')
def publish_hello():
    msg = request.args.get('msg', 'Hello!')
    sse.publish({"message": msg}, type='greeting')
    return "Message sent!"

########### OLD




@app.route('/_add_numbers')
def add_numbers():
    """Add two numbers server side, ridiculous but well..."""
    a = request.args.get('a', 0, type=int)
    b = request.args.get('b', 0, type=int)
    return jsonify(result=a + b)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/map')
def map():
    return render_template('map.html')


@app.route('/car-seats')
def car_seats():
    return render_template('car_seats.html')


@app.route('/temperature')
def temperature():
    return render_template('temperature.html')


@app.route('/_car_seats_img')
def car_seats_img():
    n = request.args.get('n', 0, type=int)
    img_url = 'static/images/car_seats_' + str(n) + '.png'
    return jsonify(result=img_url)


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=5000)
