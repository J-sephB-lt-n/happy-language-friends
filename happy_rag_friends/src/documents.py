"""Functions for working with documents"""

import sqlite3
from pathlib import Path

import config


def add_document(advisor_name: str, file_name: str, document_text: str) -> None:
    """Add a document to an advisor's knowledge base"""
    if Path(file_name).suffix != ".txt":
        raise ValueError("only .txt files are accepted as documents")
    with open(
        config.PROJECT_DATA_PATH
        / "advisors"
        / re.sub(r"[^a-zA-Z0-9_]", "_", advisor_name)
        / "knowledge_base"
        / file_name,
        "w",
        encoding="utf-8",
    ) as file:
        file.write(document_text)


def delete_document(advisor_name: str, file_name: str) -> None:
    """TODO"""
    pass
