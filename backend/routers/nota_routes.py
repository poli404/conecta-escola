from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload
from datetime import date

from database.schemas import NotaCreateSchema, NotaUpdateSchema, NotaResponseSchema
from database.dependencies import get_db
from database.models import Nota, Aluno, Disciplina, Professor
from routers.security import get_current_professor

nota_router = APIRouter(prefix="/nota", tags=["nota"])

@nota_router.get("/", response_model=list[NotaResponseSchema])
def listar_notas(db: Session = Depends(get_db)):
    """
    Lista todas as notas cadastradas de uma disciplina (ou turma?).
    """
    pass


@nota_router.post("/", response_model=NotaResponseSchema, status_code=status.HTTP_201_CREATED)
def cadastrar_nota(nota: NotaCreateSchema, db: Session = Depends(get_db)):
    """
    Cadastra uma nova nota para um aluno em uma disciplina.
    """
    pass


@nota_router.put("/{id_nota}", response_model=NotaResponseSchema)  # status code?
def atualizar_nota(id_nota: int, nota: NotaUpdateSchema, professor: Professor = Depends(get_current_professor), db: Session = Depends(get_db)):
    """
    Altera a nota de um aluno em uma disciplina.
    Permitido apenas para o professor da disciplina em questão.
    """
    pass