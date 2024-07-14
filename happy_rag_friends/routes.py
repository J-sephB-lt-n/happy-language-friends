from flask import Blueprint, render_template

bp = Blueprint("routes", __name__)


@bp.route("/")
@bp.route("/index")
def home():
    return render_template("pages/home.html")


@bp.route("/about")
def about():
    return render_template("pages/about.html")
