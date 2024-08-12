from flask import Flask

from happy_rag_friends import first_time_setup, routes


def create_app():
    app = Flask(__name__)
    first_time_setup.create_package_data_dir()
    app.register_blueprint(routes.bp)
    return app
