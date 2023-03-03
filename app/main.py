from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from app.api import api
from app.models.models import AuthDetails, Word

app = FastAPI()

origins = [
    "*",
    "http://localhost",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/languages")
def read_languages():
    return api.languages()


@app.get("/vocabulary/type/{language_id}")
def read_vocabulary_types(language_id: int):
    return api.vocabulary_types(language_id)


@app.get("/vocabulary/{type_id}")
def read_vocabulary(type_id: int):
    return api.vocabulary(type_id)


@app.post("/token")
def login(auth_details: AuthDetails):
    return api.login(auth_details)


@app.post("/insert/word")
def insert_word(username: AuthDetails = Depends(api.auth_handler.get_current_user), word: Word = None):
    return api.insert_word(word)
