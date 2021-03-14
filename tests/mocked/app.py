'''
This is the app.py acting as a server
'''
import os
from flask import Flask, send_from_directory, json
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

APP = Flask(__name__, static_folder='./build/static')

# Point SQLAlchemy to your Heroku database
APP.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
# Gets rid of a warning
APP.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

DB = SQLAlchemy(APP)
# IMPORTANT: This must be AFTER creating db variable to prevent
# circular import issues

import models
DB.create_all()

CORS = CORS(APP, resources={r"/*": {"origins": "*"}})

SOCKETIO = SocketIO(APP,
                    cors_allowed_origins="*",
                    json=json,
                    manage_session=False)

LOGIN_NAME = []


@APP.route('/', defaults={"filename": "index.html"})
@APP.route('/<path:filename>')
def index(filename):
    '''
    This is a index function
    '''
    return send_from_directory('./build', filename)


# When a client connects from this Socket connection, this function is run
@SOCKETIO.on('connect')
def on_connect():
    '''
    This is a on_connect function
    '''
    print('User connected!')


@SOCKETIO.on('join')
def on_join(data):
    '''
    This is a on_join function
    '''# data is whatever arg you pass in your emit call on client
    print(str(data))
    users = add_user(data['users'])
    SOCKETIO.emit('user_list', {'users': users})


def add_user(username):
    '''
    This is a add_user function
    '''
    new_user = models.Person(username=username,
                             email='{0}@stuff.com'.format(username))
    DB.session.add(new_user)
    DB.session.commit()
    all_people = models.Person.query.all()
    users = []
    for person in all_people:
        users.append(person.username)
    return users


# When a client disconnects from this Socket connection, this function is run
@SOCKETIO.on('disconnect')
def on_disconnect():
    '''
    This is a on_disconnect function
    '''
    print('User disconnected!')


@SOCKETIO.on('login')
def on_login(data):
    '''
    This is a on_login function
    '''
    print(data)
    name = data['message']
    LOGIN_NAME.append(name)
    print(LOGIN_NAME)
    SOCKETIO.emit('login', LOGIN_NAME, broadcast=True, include_self=True)


# When a client emits the event 'chat' to the server, this function is run
# 'chat' is a custom event name that we just decided
@SOCKETIO.on('chat')
def on_chat(data):
    '''
    This is a on_chat function
    '''# data is whatever arg you pass in your emit call on client
    print(str(data))
    # This emits the 'chat' event from the server to all clients except for
    # the client that emmitted the event that triggered this function
    SOCKETIO.emit('chat', data, broadcast=True, include_self=False)


# Note we need to add this line so we can import app in the python shell
if __name__ == "__main__":
    # Note that we don't call app.run anymore. We call socketio.run with app arg
    SOCKETIO.run(
        APP,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', '8081')),
    )