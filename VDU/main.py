# -*- coding: utf-8 -*-
"""
    jQuery Example
    ~~~~~~~~~~~~~~

    A simple application that shows how Flask and jQuery get along.

    :copyright: (c) 2015 by Armin Ronacher.
    :license: BSD, see LICENSE for more details.
"""
from flask import Flask, jsonify, render_template, request
app = Flask(__name__)


@app.route('/_add_numbers')
def add_numbers():
    """Add two numbers server side, ridiculous but well..."""
    a = request.args.get('a', 0, type=int)
    b = request.args.get('b', 0, type=int)
    return jsonify(result=a + b)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/car-seats')
def car_seats():
    return render_template('car_seats.html')


@app.route('/_car_seats_img')
def car_seats_img():
    n = request.args.get('n', 0, type=int)
    img_url = 'static/images/car_seats_' + str(n) + '.png'
    return jsonify(result=img_url)


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=5000)
