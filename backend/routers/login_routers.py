from fastapi import APIRouter, Depends #, HTTPException
from sqlalchemy.orm import Session
from database.dependencies import get_db
from database.models import Escola
from database.schemas import EscolaResponseSchema

login_router = APIRouter(prefix="/login", tags=["login"])

@login_router.get("/")
async def home():
    """
    Rota padrão de autenticação.
    """
    return {"mensagem": "hello, world! :)"}