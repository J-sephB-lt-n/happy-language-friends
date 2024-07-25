"""Main functionality of endpoint /backend/create_advisor"""

import contextlib
import sqlite3

import pydantic

import config
from src.obj import Advisor


def create_advisor(
    advisor_name: str,
    personality_description: str,
    path_to_model: str,
):
    """Adds an advisor to the database"""
    try:
        advisor = Advisor(
            advisor_name=advisor_name,
            personality_description=personality_description,
            path_to_model=path_to_model,
        )
    except pydantic.ValidationError as error:
        return f"UNPROCESSABLE ENTITY\n{error}", 422

    with contextlib.closing(sqlite3.connect(config.DB_PATH)) as conn:
        cursor = conn.cursor()
        try:
            cursor.execute(
                """
            INSERT INTO advisors (advisor_name, personality_description, path_to_model)
            VALUES (?, ?, ?)
            ;
            """,
                (
                    advisor.advisor_name,
                    advisor.personality_description,
                    advisor.path_to_model,
                ),
            )
            conn.commit()
        except sqlite3.IntegrityError:
            return "CONFLICT", 409
        return "OK", 200
