from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.dependencies import get_db
from database.models import Escola
from database.schemas import EscolaResponseSchema

login_router = APIRouter(prefix="/login", tags=["login"])

class Token(object):
    access_token: str
    token_type: str

@login_router.post("/", response_model=Token)
async def login_for_access_token(db: Session = Depends(get_db)):
    """
    Rota padrão de autenticação.
    Verifica o usuário e retorna o token de acesso.
    """
    return {"mensagem": "hello, world! :)"}