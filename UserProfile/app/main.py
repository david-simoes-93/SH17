from flask import Flask, jsonify, request, redirect, abort, make_response
from flasgger import Swagger
from flasgger.utils import swag_from
from user_profile import UserProfile
from datetime import datetime
from swagger_config import swagger_template

app = Flask(__name__)
Swagger(app, template=swagger_template)


@app.errorhandler(404)
def page_not_found(e):
    msg = "The requested URL was not found on the server"
    meta = {"status": "error"}
    return jsonify(meta=meta, message=msg), 400


@app.route('/')
def index():
    return redirect('/apidocs', code=302)


@app.route('/api/<int:user_id>', methods=['GET'])
@swag_from('docs/profile.yml')
def profile(user_id):

    dt = request.args.get('datetime', None)
    meta = {"status": "ok"}
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
        abort(make_response(jsonify(meta=meta, message=msg), 404))

    data = prof.get_profile_for_datetime(dt)

    return jsonify(meta=meta, data=data)

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=5000)
