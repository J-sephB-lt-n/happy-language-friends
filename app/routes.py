"""Defines the routes (endpoints) available in the app"""

import app.endpoints
from app import flask_app


@flask_app.route("/", methods=["GET"])
@flask_app.route("/index", methods=["GET"])
def home():
    return app.endpoints.home_page()
