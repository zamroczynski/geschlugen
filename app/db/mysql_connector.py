import mysql.connector
from configparser import ConfigParser


from app.db import queries


class MysqlConnector:
    def __init__(self, config_path):
        self.configPath = config_path
        self.config = ConfigParser()
        self.config.read(self.configPath)
        self._check_config()
        self.mydb = mysql.connector.connect(
            host=self.config.get('DB', 'host'),
            user=self.config.get('DB', 'user'),
            password='',
            database=self.config.get('DB', 'database')
        )
        self.cursor = self.mydb.cursor(dictionary=True)
        self.queries = queries.sql

    def _check_config(self):
        if not self.config.has_section('DB'):
            raise Exception('Error in config file: DB header missing')
        if not self.config.has_option('DB', 'host'):
            raise Exception('Error in config file: host field missing')
        if not self.config.has_option('DB', 'user'):
            raise Exception('Error in config file: user field missing')
        if not self.config.has_option('DB', 'password'):
            raise Exception('Error in config file: password field missing')
        if not self.config.has_option('DB', 'database'):
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

    def get_user(self, password: str):
        self.cursor.execute(self.queries['getUser'].format(password=password))
        return self.cursor.fetchone()
