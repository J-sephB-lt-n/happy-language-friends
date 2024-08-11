from pathlib import Path
from typing import Final

PROJECT_DATA_PATH: Final[Path] = Path.home() / ".happy-rag-friends"
DB_PATH: Final[Path] = PROJECT_DATA_PATH / "package_data.sqlite"
DOWNLOADED_MODELS_PATH: Final[Path] = PROJECT_DATA_PATH / "downloaded_models"
