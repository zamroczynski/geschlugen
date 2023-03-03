from datetime import datetime

utc = datetime.utcnow()

languages = [
    {
        "id": 1,
        "name": "Angielski"
    },
    {
        "id": 2,
        "name": "Niemiecki"
    }
]

vocabulary_types_eng = [{"id": 1, "name": "Słownictwo"}]

vocabulary_types_de = [
    {"id": 2, "name": "Słownictwo"},
    {"id": 3, "name": "Czasowniki nieregularne"}
]

vocabulary_eng = {
    "id": 1,
    "translation": "kot",
    "expression": "cat",
    "imperfekt": None,
    "perfekt": None
}

vocabulary_de = {
    "id": 3,
    "translation": "cyce",
    "expression": "Titten",
    "imperfekt": None,
    "perfekt": None
}

login_data = {
    "admin": {
        "username": "damian",
        "password": "damian"
    },
    "user": {
        "username": "user",
        "password": "user"
    }
}

insert_word = {
    "id": None,
    "translation": "unit test" + str(utc),
    "expression": "unit test" + str(utc),
    "imperfekt": None,
    "perfekt": None,
    "type": 1
}
