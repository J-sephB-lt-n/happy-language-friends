"""Functions for interacting with the database"""

import contextlib
import re
import sqlite3
import subprocess

import pydantic

from happy_rag_friends import config
from happy_rag_friends.src.obj import Advisor


def sqlite_dict_factory(cursor, row):
    """Setting conn.row_factory=sqlite_dict_factory makes .fetchone(), .fetchall() etc. return lists of dictionaries"""
    fields = [column[0] for column in cursor.description]
    return {key: value for key, value in zip(fields, row)}


def create_advisor(advisor_name: str, personality_description: str, model_name: str):
    """Adds an advisor to the database"""
    try:
        advisor = Advisor(
            advisor_name=advisor_name,
            personality_description=personality_description,
            model_name=model_name,
        )
    except pydantic.ValidationError as error:
        return f"UNPROCESSABLE ENTITY\n{error}", 422

    with contextlib.closing(sqlite3.connect(config.DB_PATH)) as conn:
        cursor = conn.cursor()
        try:
            cursor.execute(
                """
            INSERT INTO advisors (advisor_name, personality_description, model_name)
            VALUES (?, ?, ?)
            ;
            """,
                (
                    advisor.advisor_name,
                    advisor.personality_description,
                    advisor.model_name,
                ),
            )
            conn.commit()
        except sqlite3.IntegrityError:
            return (
                "CONFLICT\nAn advisor with this name already exists in the database",
                409,
            )
        return "OK", 200


def get_advisor_details():
    """Fetch basic info on every advisor in the database"""
    with contextlib.closing(sqlite3.connect(config.DB_PATH)) as conn:
        conn.row_factory = sqlite_dict_factory
        cursor = conn.cursor()
        advisors_info: list[dict] = cursor.execute(
            """                                                                     
            SELECT      advisor_name
                    ,   personality_description
                    ,   model_name
            FROM        advisors
            ;                                                                           
        """
        ).fetchall()
    return advisors_info


def list_available_models():
    """Returns a list of LLMs which can be used in this application"""
    return [
        model_name
        for model_name in subprocess.run(
            ["litgpt", "download", "list"], capture_output=True, text=True
        ).stdout.split("\n")
        if re.match(r"[^\s]+/[^\s]+", model_name)
    ]


def list_downloaded_models():
    """Returns a list of LLMs which have been previously downloaded"""
    pass
