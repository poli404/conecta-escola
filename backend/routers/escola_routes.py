from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

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

    nova_escola = Escola(nome=escola.nome, cnpj=escola.cnpj, endereco=escola.endereco, dominio=escola.dominio, senha=escola.senha)
    db.add(nova_escola)
    db.commit()
    db.refresh(nova_escola)
    return nova_escola