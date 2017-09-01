import json

from flask import Flask, jsonify, request, redirect, abort, make_response, render_template
from user_profile import UserProfile
from datetime import datetime
from flask_mqtt import Mqtt

app = Flask(__name__)

app.config['TEMPLATES_AUTO_RELOAD'] = True
#app.config['MQTT_BROKER_URL'] = 'broker.hivemq.com'
app.config['MQTT_BROKER_URL'] = 'test.mosquitto.org'
#app.config['MQTT_BROKER_PORT'] = 1883  # default port for non-tls connection
#app.config['MQTT_USERNAME'] = ''  # set the username here if you need authentication for the broker
#app.config['MQTT_PASSWORD'] = ''  # set the password here if the broker demands authentication
#app.config['MQTT_KEEPALIVE'] = 5  # set the time interval for sending a ping to the broker to 5 seconds
#app.config['MQTT_TLS_ENABLED'] = False  # set TLS to disabled for testing purposes


mqtt = Mqtt(app)

TOPIC_IN = 'upcu/profile/in'
TOPIC_OUT = 'upcu/profile/out'


#for topic in topics_in:
mqtt.subscribe(TOPIC_IN)
mqtt.subscribe(TOPIC_OUT)

@mqtt.on_message()
def handle_mqtt_message(client, userdata, message):
    meta = {"status": "ok"}
    data = dict(
        topic=message.topic,
        payload=message.payload.decode()
    )

    print(data)
    payload = json.loads(data['payload'])
    action = get_action_from_request(payload)

    print("PAYLOAD: " + str(payload))
    print("ACTION: " + action)
    if action == 'get':
        user_id = payload['user_id']
        print("USER_ID:" + str(user_id))
        profile = get_profile(int(user_id))
        send_profile(json.dumps({ "status": "success", "profile": profile }))
    else:
        print("===== PROFILE ======")

    return "message processed"


def send_profile(data):
    mqtt.publish(TOPIC_OUT, data)

@app.route('/teste')
def index():
    mqtt.publish(TOPIC_IN, json.dumps({ "action": "get", "user_id": 1 }))
    return "msg sent"


def get_action_from_request(payload):
    if 'action' in payload:
        return payload['action']
    else:
        return 'none'



        #prof = UserProfile(userId)
        #if not prof.has_profile():
        #    return jsonify(meta=meta, data={'msg': 'User not found' })

        #data = prof.get_profile()
        #return jsonify(meta=meta, data=data)
        #return render_template('index.html', data=data)


def get_profile(user_id):

    prof = UserProfile(user_id)
    if not prof.has_profile():
        msg = "User not found"
    #    abort(make_response(jsonify(meta=meta, message=msg), 404))

    return prof.get_profile()


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=5001)
