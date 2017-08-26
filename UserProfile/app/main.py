from flask import Flask, jsonify, request, redirect, abort, make_response
from flasgger import Swagger
from flasgger.utils import swag_from
from user_profile import UserProfile
from datetime import datetime

app = Flask(__name__)

template = {
    "info": {
        "title": "User Profile API",
        "description": "API to use in Sunset Hackathon 2017's project ",
        "contact": {
            "responsibleOrganization": "Team 1",
            "responsibleDeveloper": "Me",
            "email": "ruidamendes@ua.pt",
        },
        "version": "0.0.1"
    },
    "host": "mysite.com",  # overrides localhost:500
    "basePath": "/api",  # base bash for blueprint registration
    "schemes": [
        "http",
        "https"
    ],
    "specs_route": "/api/"
}

Swagger(app, template=template)


@app.route('/')
def index():
    return redirect('/apidocs', code=302)


@app.route('/api/<int:user_id>', methods=['GET'])
@swag_from('docs/profile.yml')
def profile(user_id):

    try:
        dt = request.args.get('datetime')
        dt = datetime.strptime(dt, '%Y-%m-%dT%H:%M')
    except ValueError:
        msg = "Wrong datetime format (YYYY-mm-ddTHH:MM)"
        abort(make_response(jsonify(meta={"status": "error"}, message=msg), 400))

    # TODO: update documentation
    # TODO: add profiles dummy data

    profile = UserProfile(user_id)
    if not profile.has_profile():
        msg = "User not found"
        abort(make_response(jsonify(meta={"status": "error"}, message=msg), 404))

    data = profile.get_profile_for_datetime(dt)

    return jsonify(meta={"status": "ok"}, data=data)

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=5000)
