import subprocess

import flask

from happy_rag_friends import config
from happy_rag_friends.src import db, llm

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
    status_text, status_code = db.create_advisor(
        advisor_name=input_json["advisor_name"],
        personality_description=input_json["personality_description"],
        llm_name=input_json["llm_name"],
    )
    return flask.Response(status_text, status=status_code)


@bp.route("/backend/get_advisor_details", methods=["GET"])
def get_advisor_details():
    advisor_details: list[dict] = db.get_advisor_details()
    return flask.jsonify(advisor_details)


# @bp.route("/backend/update_advisor", methods=["PATCH"])
# def update_advisor_details():
#     status_text, status_code =


@bp.route("/backend/get_llm_list", methods=["GET"])
def get_llm_list():
    available_models: list[str] = llm.list_available_models()
    downloaded_models: list[str] = llm.list_downloaded_models()
    return flask.jsonify(
        {
            llm_name: {"downloaded": llm_name in downloaded_models}
            for llm_name in available_models
        }
    )


@bp.route("/backend/download_model", methods=["POST"])
def download_model():
    input_json = flask.request.get_json()
    llm_name: str = input_json["llm_name"]
    available_models: list[str] = db.list_available_models()
    if llm_name not in available_models:
        return flask.Response(f"Model '{llm_name}' is not available", status=404)
    try:
        subprocess.run(
            [
                "litgpt",
                "download",
                llm_name,
                "--checkpoint_dir",
                config.DOWNLOADED_MODELS_PATH,
            ],
            check=True,
        )
    except subprocess.CalledProcessError as err:
        return flask.Response(
            f"Error while attempting to download model:\n{err}", status=500
        )
    return flask.Response(
        f"Successfully downloaded model '{llm_name}' to {config.DOWNLOADED_MODELS_PATH}/{llm_name}",
        status=200,
    )
