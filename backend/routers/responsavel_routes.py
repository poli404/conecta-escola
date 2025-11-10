from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload

from database.schemas import ResponsavelCreateSchema, ResponsavelResponseSchema
from database.dependencies import get_db
from database.models import Responsavel, Aluno
from routers.security import get_password_hash

responsavel_router = APIRouter(prefix="/responsavel", tags=["responsavel"])

@responsavel_router.get("/", response_model=list[ResponsavelResponseSchema])
def listar_responsaveis(db: Session = Depends(get_db)):
    """
    Lista todos os responsáveis cadastrados e seus respectivos alunos associados.
    """
    responsaveis = db.query(Responsavel).options(joinedload(Responsavel.alunos)).all()
    if not responsaveis:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Nenhum responsável cadastrado.")
    return responsaveis


@responsavel_router.post("/cadastro", response_model=ResponsavelResponseSchema, status_code=status.HTTP_201_CREATED)
def cadastrar_responsavel(responsavel: ResponsavelCreateSchema, db: Session = Depends(get_db)):
    """
    Cadastra um novo responsável no sistema.
    """
    responsavel.cpf = responsavel.cpf.replace(".", "").replace("-", "")
    responsavel.rg = responsavel.rg.replace(".", "").replace("-", "")
    responsavel.cep = responsavel.cep.replace("-", "")
    responsavel.telefone = responsavel.telefone.replace("-", "")

    existente = db.query(Responsavel).filter(Responsavel.cpf == responsavel.cpf).first()
    if existente:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Responsável já cadastrado(a).")
    
    responsavel.id_aluno = responsavel.id_aluno.replace(".", "").replace("-", "")

    aluno = db.query(Aluno).filter(Aluno.cpf == responsavel.id_aluno).first()
    hashed_password = get_password_hash(responsavel.senha)
    novo_responsavel = Responsavel(**responsavel.model_dump(exclude={"senha", "id_aluno"}), senha=hashed_password, aluno=aluno)
    
    db.add(novo_responsavel)
    db.commit()
    db.refresh(novo_responsavel)
    return novo_responsavel