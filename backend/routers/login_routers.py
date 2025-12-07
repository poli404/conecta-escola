from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from pydantic import BaseModel

from database.dependencies import get_db
from database.models import Escola, Professor, Responsavel
from routers.security import verify_password, create_access_token

login_router = APIRouter(prefix="/login", tags=["login"])

class Token(BaseModel):
    access_token: str
    token_type: str

class UsuarioInfo(BaseModel):
    tipo: str
    id: int | str  # int para escola, str (cpf) para professor/responsavel
    email: str
    nome: str | None = None

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
        user = db.query(Responsavel).filter(Responsavel.emailPessoal == email).first()

    if not user or not verify_password(senha, user.senha):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="E-mail ou senha incorretos", headers={"WWW-Authenticate": "Bearer"})

    email_usuario = getattr(user, 'email', None) or getattr(user, 'emailEscolar', None)
    access_token = create_access_token(data={"sub": email_usuario})

    return {"access_token": access_token, "token_type": "bearer"}


@login_router.get("/usuario/{email}", response_model=UsuarioInfo)
async def get_usuario_por_email(email: str, db: Session = Depends(get_db)):
    """
    Busca informações básicas de um usuário pelo email.
    Retorna o tipo (escola/professor/responsavel), id/cpf, email e nome.
    """
    user = db.query(Escola).filter(Escola.email == email).first()
    if user:
        return {
            "tipo": "escola",
            "id": user.id,
            "email": user.email,
            "nome": user.nome
        }
    
    user = db.query(Professor).filter(Professor.emailEscolar == email).first()
    if user:
        return {
            "tipo": "professor",
            "id": user.cpf,
            "email": user.emailEscolar,
            "nome": user.nome
        }
    
    user = db.query(Responsavel).filter(Responsavel.emailPessoal == email).first()
    if user:
        return {
            "tipo": "responsavel",
            "id": user.cpf,
            "email": user.emailPessoal,
            "nome": user.nome
        }
    
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuário não encontrado")