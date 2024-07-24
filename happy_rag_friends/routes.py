import flask

# from flask import Blueprint, render_template

import backend

bp = flask.Blueprint("routes", __name__)


@bp.route("/")
@bp.route("/index")
def home():
    return flask.render_template("pages/home.html")


@bp.route("/about")
def about():
    return flask.render_template("pages/about.html")


@bp.route("/advisor-settings")
def advisor_settings():
    return flask.render_template("pages/advisor-settings.html")


@bp.route("/ask-a-question")
def ask_a_question():
    return flask.render_template("pages/ask-a-question.html")


@bp.route("/general-settings")
def general_settings():
    return flask.render_template("pages/general-settings.html")


@bp.route("/backend/create_advisor", methods=["POST"])
def create_advisor():
    input_json = flask.request.get_json()
    status_text, status_code = backend.create_advisor(
        advisor_name=input_json["advisor_name"],
        personality_description=input_json["personality_description"],
        path_to_model=input_json["path_to_model"],
    )
    return flask.Response(status_text, status=status_code)


# @bp.route("/backend/fetch_advisor_info")
# def fetch_advisor_info():
#
