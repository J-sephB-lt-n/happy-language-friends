"""Functionality related to installation of the python package"""

import sqlite3
import warnings
from pathlib import Path

from happy_rag_friends import config


class PersistentDataWarning(Warning):
    pass


def create_package_data_dir():
    """Creates data resources used by the package (database etc.)"""
    package_data_dir = Path.home() / ".happy-rag-friends"
    if not package_data_dir.exists():
        package_data_dir.mkdir(parents=True)

    if not config.DB_PATH.exists():
        warnings.warn(
            f"\nPackage data written to {package_data_dir} is not deleted on 'pip uninstall happy-rag-friends' - you will need to delete this data using `happy-rag-friends uninstall` prior to `pip uninstall happy-rag-friends`",
            PersistentDataWarning,
        )
        conn = sqlite3.connect(config.DB_PATH)
        cursor = conn.cursor()
        cursor.executescript(
            """
    CREATE TABLE IF NOT EXISTS advisors (
        advisor_name TEXT NOT NULL PRIMARY KEY,
        personality_description TEXT,
        llm_name TEXT
    )
    ;
    
    INSERT INTO advisors (advisor_name, personality_description, llm_name)
    VALUES ('D. Folt', 'a knowledgeable advisor.', NULL)
    ;
    """
        )
        conn.commit()
        conn.close()
        print(f"created package database at {config.DB_PATH}")
