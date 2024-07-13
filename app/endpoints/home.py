"""Page shown on app entry"""

import flask


def home_page():
    return flask.Response("Hello World", status=200)
