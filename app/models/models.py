from pydantic import BaseModel


class Languages(BaseModel):
    id: int
    name: str


class VocabularyType(BaseModel):
    id: int
    name: str
    languages: int


class Vocabulary(BaseModel):
    id: int
    translation: str
    expression: str
    type: int


class Users(BaseModel):
    id: int
    login: str
    password: str
    role: id


class Role(BaseModel):
    id: int
    name: str
