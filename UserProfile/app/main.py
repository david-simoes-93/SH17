from flask import Flask, jsonify, request, redirect, abort, make_response
from flasgger import Swagger
from flasgger.utils import swag_from
from user_profile import UserProfile
from datetime import datetime
from swagger_config import swagger_template

app = Flask(__name__)
Swagger(app, template=swagger_template)


@app.route('/')
def index():
    return redirect('/apidocs', code=302)


@app.route('/api/<int:user_id>', methods=['GET'])
@swag_from('docs/profile.yml')
def profile(user_id):

    dt = request.args.get('datetime', None)

    try:
        if dt:
            dt = datetime.strptime(dt, '%Y-%m-%dT%H:%M')
        else:
            dt = datetime.now()
    except ValueError:
        msg = "Wrong datetime format (YYYY-mm-ddTHH:MM)"
        abort(make_response(jsonify(meta={"status": "error"}, message=msg), 400))

    # TODO: add profiles dummy data

    prof = UserProfile(user_id)
    if not prof.has_profile():
        msg = "User not found"
        abort(make_response(jsonify(meta={"status": "error"}, message=msg), 404))

    data = prof.get_profile_for_datetime(dt)

    return jsonify(meta={"status": "ok"}, data=data)

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=5000)
