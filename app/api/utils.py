import json
import os

from app import


def read_config():
    config_file = open(CONFIG_PATH)
    data = json.load(config_file)
    return data
