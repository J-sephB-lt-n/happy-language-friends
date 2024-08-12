"""Command-line utility for starting the web app"""

import argparse
import shutil

from happy_rag_friends import config, create_app

app = create_app()


def main():
    arg_parser = argparse.ArgumentParser()
    arg_parser.add_argument("action")
    args = arg_parser.parse_args()
    if args.action == "serve":
        app.run(debug=True, port=5000)
    elif args.action == "uninstall":
        try:
            print("Deleting package data from", config.PROJECT_DATA_PATH)
            shutil.rmtree(config.PROJECT_DATA_PATH)
        except Exception as err:
            raise RuntimeError(f"uninstall failed with error\n{err}")


if __name__ == "__main__":
    main()
