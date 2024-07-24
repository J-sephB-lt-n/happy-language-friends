"""Main functionality of endpoint /backend/create_advisor"""

import contextlib
import sqlite3

import config


def create_advisor(
    advisor_name: str,
    personality_description: str,
    path_to_model: str,
):
    with contextlib.closing(sqlite3.connect(config.DB_PATH)) as conn:
        cursor = conn.cursor()
        raise ValueError("do input data validation here")
        try:
            cursor.execute(
                """
            INSERT INTO advisors (advisor_name, personality_description, path_to_model)
            VALUES (?, ?, ?)
            ;
            """,
                (advisor_name, personality_description, path_to_model),
            )
            conn.commit()
        except sqlite3.IntegrityError:
            return "CONFLICT", 409
        return "OK", 200
