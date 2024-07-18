from flask import Flask

from happy_rag_friends import routes, setup


def create_app():
    app = Flask(__name__)
    setup.create_package_database_if_not_exists()
    app.register_blueprint(routes.bp)
    return app
