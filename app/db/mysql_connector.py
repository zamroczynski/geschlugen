import mysql.connector

from app.db import queries
from app.models.models import Word


class MysqlConnector:
    def __init__(self, config):
        self.config = config
        self._check_config()
        self.mydb = mysql.connector.connect(
            host=self.config.get('HOST'),
            user=self.config.get('USER'),
            password=self.config.get('PASSWORD'),
            database=self.config.get('DATABASE')
        )
        self.cursor = self.mydb.cursor(dictionary=True)
        self.queries = queries.sql

    def _check_config(self):
        if "HOST" not in self.config:
            raise Exception('Error in config file: host field missing')
        if "USER" not in self.config:
            raise Exception('Error in config file: user field missing')
        if "PASSWORD" not in self.config:
            raise Exception('Error in config file: password field missing')
        if "DATABASE" not in self.config:
            raise Exception('Error in config file: database field missing')

    def get_languages(self):
        self.cursor.execute(self.queries['getLanguages'])
        return self.cursor.fetchall()

    def get_vocabulary_types(self, language_id: int):
        self.cursor.execute(self.queries['getVocabularyType'].format(language=language_id))
        return self.cursor.fetchall()

    def get_vocabulary(self, type_id: int):
        self.cursor.execute(self.queries['getVocabulary'].format(type=type_id))
        return self.cursor.fetchall()

    def get_user(self, login: str):
        self.cursor.execute(self.queries['getUser'].format(login=login))
        return self.cursor.fetchone()

    def insert_vocabulary(self, word: Word):
        sql = self.queries['insertVocabulary']
        val = (word.translation, word.expression, word.imperfekt, word.perfekt, word.type)
        self.cursor.execute(sql, val)
        self.mydb.commit()
        return self.cursor.rowcount
