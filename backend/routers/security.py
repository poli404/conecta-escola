from datetime import datetime, timedelta, timezone
from typing import Optional
from jose import jwt, JWTError
import os
import bcrypt
from dotenv import load_dotenv
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from database.dependencies import get_db
from database.models import Escola, Professor, Responsavel, Aluno

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def get_password_hash(password: str) -> str:
    """
    Gera hash bcrypt da senha.
    Bcrypt tem limite de 72 bytes - trunca automaticamente se necessário.
    """
    password_bytes = password.encode('utf-8')[:72]  # Trunca para 72 bytes
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password_bytes, salt)
    return hashed.decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verifica se a senha corresponde ao hash.
    Aplica mesmo truncamento de 72 bytes.
    """
    password_bytes = plain_password.encode('utf-8')[:72]  # Mesmo truncamento
    hashed_bytes = hashed_password.encode('utf-8')
    return bcrypt.checkpw(password_bytes, hashed_bytes)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    """
    Valida o token JWT e retorna o usuário autenticado.
    Busca em Escola, Professor, Responsavel ou Aluno.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Não foi possível validar as credenciais",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        # Decodifica o token JWT
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        identificador: str = payload.get("sub")
        if identificador is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    # Busca o usuário no banco de dados por email
    user = db.query(Escola).filter(Escola.email == identificador).first()
    if user:
        return {"tipo": "escola", "usuario": user}
    
    user = db.query(Professor).filter(Professor.emailEscolar == identificador).first()
    if user:
        return {"tipo": "professor", "usuario": user}
    
    user = db.query(Responsavel).filter(Responsavel.emailPessoal == identificador).first()
    if user:
        return {"tipo": "responsavel", "usuario": user}
    
    # Se não encontrou por email, busca por CPF (aluno)
    cpf_limpo = identificador.replace(".", "").replace("-", "")
    user = db.query(Aluno).filter(Aluno.cpf == cpf_limpo).first()
    if user:
        return {"tipo": "aluno", "usuario": user}
    
    raise credentials_exception

def get_current_professor(current_user: dict = Depends(get_current_user)):
    """
    Garante que o usuário autenticado é um Professor.
    Usado para proteger rotas que apenas professores podem acessar.
    """
    if current_user["tipo"] != "professor":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Acesso negado: apenas professores podem realizar esta ação")
    return current_user["usuario"]

def get_current_escola(current_user: dict = Depends(get_current_user)):
    """
    Garante que o usuário autenticado é uma Escola.
    Usado para proteger rotas administrativas (cadastros, relatórios, etc).
    """
    if current_user["tipo"] != "escola":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Acesso negado: apenas a escola pode realizar esta ação")
    return current_user["usuario"]

def get_current_aluno(current_user: dict = Depends(get_current_user)):
    """
    Garante que o usuário autenticado é um Aluno.
    """
    if current_user["tipo"] != "aluno":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Acesso negado: apenas alunos podem realizar esta ação")
    return current_user["usuario"]

def get_current_responsavel(current_user: dict = Depends(get_current_user)):
    """
    Garante que o usuário autenticado é um Responsável.
    """
    if current_user["tipo"] != "responsavel":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Acesso negado: apenas responsáveis podem realizar esta ação")
    return current_user["usuario"]