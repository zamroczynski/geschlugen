from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from app.api import api
from app.models.models import Token

app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

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
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    return api.login_for_access_token(form_data)

