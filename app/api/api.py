import os
from pathlib import Path

from app.db.mysql_connector import MysqlConnector


path = Path('app')
config_path = os.path.join(path, "config.ini")
mysql_connector = MysqlConnector(config_path=config_path)


def languages():
    data = mysql_connector.get_languages()
    return data


def vocabulary_types(language_id: int):
    data = mysql_connector.get_vocabulary_types(language_id)
    return data


def vocabulary(type_id: int):
    data = mysql_connector.get_vocabulary(type_id)
    return data


def user(password: str):
    data = mysql_connector.get_user(password)
    return data
