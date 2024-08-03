"""Classes used within this project"""

from pathlib import Path

import pydantic


class Advisor(pydantic.BaseModel):
    advisor_name: str
    personality_description: str
    path_to_model: str

    @pydantic.field_validator("advisor_name")
    def valid_advisor_name(cls, v: str) -> str:
        v = v.strip()
        if not (2 <= len(v) <= 50):
            raise ValueError("Advisor name must be between 2 and 50 characters long")
        return v

    @pydantic.field_validator("personality_description")
    def valid_personality_description(cls, v: str) -> str:
        v = v.strip()
        if not (2 <= len(v) <= 500):
            raise ValueError(
                "Advisor personality description must be between 2 and 500 characters long"
            )
        return v

    @pydantic.field_validator("path_to_model")
    def valid_path_to_model(cls, v: str) -> str:
        v = v.strip()
        if not (6 <= len(v) <= 300):
            raise ValueError("Model filepath must be between 6 and 300 characters long")
        if not v.endswith(".gguf"):
            raise ValueError("Model filepath must have a .gguf extension")
        if not Path(v).is_file():
            raise ValueError("Model file does not exist")
        return v
