from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import api
# from app.db import mysql_connector


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


@app.post("/login")
def login(type_id: int):
    return api.user(type_id)
