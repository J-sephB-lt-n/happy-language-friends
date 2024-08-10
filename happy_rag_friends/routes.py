from pathlib import Path

import flask

import src.db

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
    status_text, status_code = src.db.create_advisor(
        advisor_name=input_json["advisor_name"],
        personality_description=input_json["personality_description"],
        path_to_model=input_json["path_to_model"],
    )
    return flask.Response(status_text, status=status_code)


@bp.route("/backend/get_advisor_details", methods=["GET"])
def get_advisor_details():
    advisor_details: list[dict] = src.db.get_advisor_details()
    return flask.jsonify(advisor_details)


# @bp.route("/backend/update_advisor", methods=["PATCH"])
# def update_advisor_details():
#     status_text, status_code =


@bp.route("/backend/check_model_filepath_valid", methods=["GET"])
def check_model_filepath_valid():
    model_filepath: str = flask.request.args["filepath"]
    if not Path(model_filepath).is_file():
        return flask.jsonify(
            {"filepath_is_valid": False, "error": "There is no file at this path"}
        )
    if not Path(model_filepath).suffix == ".gguf":
        return flask.jsonify(
            {
                "filepath_is_valid": False,
                "error": "Model file must have .gguf extension",
            }
        )
    return flask.jsonify({"filepath_is_valid": True, "error": None})


@bp.route("backend/list_available_models", methods=["GET"])
def list_available_models():
    available_models: list[str] = src.db.list_available_models()
    downloaded_models: list[str] = src.db.list_downloaded_models()
    return flask.Response("OK", status=200)
