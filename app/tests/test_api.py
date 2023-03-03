from fastapi.testclient import TestClient
import unittest

from app.main import app
from app.tests.tests_data import languages, vocabulary_types_eng, vocabulary_types_de, vocabulary_de, vocabulary_eng, login_data, insert_word
from app.models.models import Word


class TestAPI(unittest.TestCase):
    def setUp(self) -> None:
        self.client = TestClient(app)

    def test_read_languages(self):
        response = self.client.get("/languages")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), languages)

    def test_read_vocabulary_types_eng(self):
        response = self.client.get("/vocabulary/type/1")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), vocabulary_types_eng)

    def test_read_vocabulary_types_de(self):
        response = self.client.get("/vocabulary/type/2")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), vocabulary_types_de)

    def test_read_vocabulary_eng(self):
        response = self.client.get("/vocabulary/1")
        self.assertEqual(response.status_code, 200)
        response_dict = dict(response.json()[0])
        self.assertEqual(response_dict.keys(), vocabulary_eng.keys())

    def test_read_vocabulary_de(self):
        response = self.client.get("/vocabulary/2")
        response_dict = dict(response.json()[0])
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response_dict.keys(), vocabulary_de.keys())

    def test_login(self):
        user = login_data.get('user')
        expected_response = {"token": "token"}
        response = self.client.post(
            '/token',
            json={"username": user['username'], "password": user['password']}
        )
        response_dict = dict(response.json())
        self.assertEqual(response.status_code, 200)
        self.assertNotEqual(response.json(), {"detail": "Invalid username and/or password"})
        self.assertEqual(response_dict.keys(), expected_response.keys())


    def test_insert_word(self):
        admin = login_data.get('admin')
        token = self.client.post(
            '/token',
            json={"username": admin['username'], "password": admin['password']}
        )
        token_json = token.json()
        response = self.client.post(
            '/insert/word',
            headers={"Authorization": f'Bearer {token_json["token"]}'},
            json=insert_word
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"record inserted": 1})
