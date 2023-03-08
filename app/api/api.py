from fastapi import HTTPException
import random

from app.db.mysql_connector import MysqlConnector
from app.models.models import AuthDetails, Word
from app.config import config
from app.api.AuthHandler import AuthHandler


SECURITY = config.get('SECURITY')
SECRET_KEY = SECURITY.get('SECRET_KEY')
ALGORITHM = SECURITY.get('ALGORITHM')
ACCESS_TOKEN_EXPIRE_MINUTES = SECURITY.get('ACCESS_TOKEN_EXPIRE_MINUTES')

DB = config.get('DB')
mysql_connector = MysqlConnector(config=DB)

auth_handler = AuthHandler()


def login(auth_details: AuthDetails):
    user = mysql_connector.get_user(auth_details.username)
    if (user is None) or (not auth_handler.verify_password(auth_details.password, user['password'])):
        raise HTTPException(status_code=401, detail='Invalid username and/or password')
    token = auth_handler.encode_token(user['username'])
    return {'token': token}


def languages():
    data = mysql_connector.get_languages()
    return data


def vocabulary_types(language_id: int):
    data = mysql_connector.get_vocabulary_types(language_id)
    return data


def vocabulary(type_id: int):
    data = mysql_connector.get_vocabulary(type_id)
    random.shuffle(data)
    return data


def insert_word(word: Word):
    data = mysql_connector.insert_vocabulary(word)
    return {'record inserted': data}