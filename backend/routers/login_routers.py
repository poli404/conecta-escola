from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from pydantic import BaseModel

from database.dependencies import get_db
from database.models import Escola, Professor, Responsavel
from database.schemas import EscolaResponseSchema
from routers.security import verify_password, create_access_token

login_router = APIRouter(prefix="/login", tags=["login"])

class Token(BaseModel):
    access_token: str
    token_type: str

@login_router.post("/", response_model=Token)
async def login_usuarios(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """
    Rota padrão de autenticação.
    Verifica o usuário e retorna o token de acesso.
    """
    email = form_data.username
    senha = form_data.password

    user = db.query(Escola).filter(Escola.email == email).first()
    if not user:
        user = db.query(Professor).filter(Professor.emailEscolar == email).first()
    if not user:
        user = db.query(Responsavel).filter(Responsavel.emailEscolar == email).first()

    if not user or not verify_password(senha, user.senha):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="E-mail ou senha incorretos", headers={"WWW-Authenticate": "Bearer"})

    email_usuario = getattr(user, 'email', None) or getattr(user, 'emailEscolar', None)
    access_token = create_access_token(data={"sub": email_usuario})

    return {"access_token": access_token, "token_type": "bearer"}