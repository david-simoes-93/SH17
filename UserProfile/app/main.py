import json
from flask import Flask, jsonify, request, redirect, render_template, g
from user_profile import UserProfile
from datetime import datetime
from flask_mqtt import Mqtt
import uuid
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config.from_pyfile('config.py')
db = SQLAlchemy(app)


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

mqtt.subscribe(TOPIC_IN)
#mqtt.subscribe(TOPIC_OUT)

@mqtt.on_message()
def handle_mqtt_message(client, userdata, message):
    data = dict(
        topic=message.topic,
        payload=message.payload.decode()
    )

    print(data)
    payload = json.loads(data['payload'])
    action = get_action_from_request(payload)

    #print("PAYLOAD: " + str(payload))
    print("ACTION: " + action)

    if action == 'get':
        user_id = payload['profile_id']
        print("USER_ID:" + str(user_id))
        profile = get_profile(user_id)
        send_profile(json.dumps({ "status": "success", "profile": profile }))
    elif action == 'create':
        #create_profile(payload)
        print("===== PROFILE CREATED ======")
    else:
        return "cenas"

    return "message processed"


def send_profile(data):
    mqtt.publish(TOPIC_OUT, data)


def get_action_from_request(payload):
    if 'action' in payload:
        return payload['action']
    else:
        return 'none'

#################### TESTING ##################################
@app.route('/teste')
def index2():
    mqtt.publish(TOPIC_IN, json.dumps({ "action": "get", "profile_id": '45f2d0a3-a2c3-448a-bfb7-a68eb30e5a97' }))
    return "msg sent"

@app.route('/teste_criar')
def index3():
    data = {
        "action": "create",
        "profile_id": str(uuid.uuid4()),
        "name": "Cenas",
        "image": ""
    }
    mqtt.publish(TOPIC_IN, json.dumps(data))
    return "profile created"

@app.route('/')
def index():
    from base64 import b64encode
    profile = get_profile()
    img = profile['image']
    return render_template('index.html', img=img)

#################### TESTING END ##################################






################ BD ######################

@app.route('/profile/', methods = ['GET'])
def get_profile(id=''):

    profile = Profile.query.get(id)
    if profile:
        return profile.as_dict()
    return {}

@app.route('/profile/', methods = ['POST'])
def create_profile(data):

    id = data['profile_id']
    name = data['name']
    image = data['image'] if data['image'] else None

    # TODO: process data
    if not id: id = str(uuid.uuid4())
    if not name: name = "John"
    #if not image: image = ''
    #TODO: remove end

    spotify_id = Profile.query.count() + 1

    profile = Profile(id, name, image, spotify_id)
    db.session.add(profile)
    db.session.commit()

    return 'profile created', 201


class Profile(db.Model):
    id = db.Column(db.String, primary_key=True)
    name = db.Column(db.String(20))
    image_url = db.Column(db.String(20))
    spotify_id = db.Column(db.Integer)

    def __init__(self, id, name, image, spotify_id):
        self.id = id
        self.name = name
        self.image_url= image
        self.spotify_id= spotify_id

    def as_dict(self):
        result = {}
        if self.id:
            result = { c.name: getattr(self, c.name) for c in self.__table__.columns }
        return result

#############################################






if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=5001)
