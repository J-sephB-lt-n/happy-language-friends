import re
import subprocess


def list_available_models() -> list[str]:
    """Returns a list of LLMs which can be used in this application"""
    return [
        llm_name
        for llm_name in subprocess.run(
            ["litgpt", "download", "list"], capture_output=True, text=True
        ).stdout.split("\n")
        if re.match(r"[^\s]+/[^\s]+", llm_name)
    ]


def list_downloaded_models() -> list[str]:
    """Returns a list of LLMs which have been previously downloaded"""
    return []
