from pydantic import BaseModel


class AuthDetails(BaseModel):
    username: str
    password: str


class Word(BaseModel):
    id: int | None
    translation: str
    expression: str
    imperfekt: str | None
    perfekt: str | None
    type: int
