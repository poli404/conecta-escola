from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from security import get_password_hash

from database.schemas import EscolaCreateSchema, EscolaResponseSchema
from database.dependencies import get_db
from database.models import Escola


escola_router = APIRouter(prefix="/escola", tags=["escola"])

@escola_router.get("/", response_model=list[EscolaResponseSchema])
def listar_escolas(db: Session = Depends(get_db)):
    escolas = db.query(Escola).all()
    if not escolas:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Nenhuma escola cadastrada.")
    return escolas

@escola_router.post("/cadastro", response_model=EscolaResponseSchema, status_code=status.HTTP_201_CREATED)
def cadastrar_escola(escola: EscolaCreateSchema, db: Session = Depends(get_db)):
    existente = db.query(Escola).filter(Escola.dominio == escola.dominio).first()
    if existente:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Escola já cadastrada.")

    hashed_password = get_password_hash(existente.senha)

    nova_escola = Escola(nome=escola.nome, cnpj=escola.cnpj, endereco=escola.endereco, dominio=escola.dominio, senha=hashed_password)
    db.add(nova_escola)
    db.commit()
    db.refresh(nova_escola)
    return nova_escola

"""@escola_router.get("/professores", response_model=list[ProfessorResponseSchema])
def listar_professores(db: Session = Depends(get_db)):
    professores = db.query(Professor).options(joinedload(Professor.escola)).all()
    if not professores:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Nenhum professor cadastrado.")
    return professores"""