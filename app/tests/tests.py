from fastapi.testclient import TestClient
import unittest

from app.main import app
from app.tests.tests_data import languages, vocabulary_types_eng, vocabulary_types_de, vocabulary_de, vocabulary_eng

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
        self.assertEqual(response.json(), vocabulary_eng)

    def test_read_vocabulary_de(self):
        response = self.client.get("/vocabulary/2")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), vocabulary_de)
