"""Steps taken at app initialisation"""

import flask

flask_app = flask.Flask(__name__)

from app import routes
