from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload

from database.schemas import DisciplinaCreateSchema, DisciplinaResponseSchema
from database.dependencies import get_db
from database.models import Disciplina, Professor

disciplina_router = APIRouter(prefix="/disciplina", tags=["disciplina"])

@disciplina_router.get("/", response_model=list[DisciplinaResponseSchema])
def listar_disciplinas(db: Session = Depends(get_db)):
    """
    Lista todas as disciplinas cadastradas.
    """
    disciplinas = db.query(Disciplina).options(joinedload(Disciplina.professor)).all()
    if not disciplinas:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Nenhuma disciplina cadastrada.")
    return disciplinas


@disciplina_router.post("/cadastro", response_model=DisciplinaResponseSchema, status_code=status.HTTP_201_CREATED)
def cadastrar_disciplina(disciplina: DisciplinaCreateSchema, db: Session = Depends(get_db)):
    """
    Cadastra uma nova disciplina no sistema.
    """
    disciplina.id_professor = disciplina.id_professor.replace(".", "").replace("-", "")

    professor = db.query(Professor).filter(Professor.cpf == disciplina.id_professor).first()
    if not professor:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Professor(a) não cadastrado(a).")

    existente = db.query(Disciplina).filter(Disciplina.descricao == disciplina.descricao, Disciplina.idProfessor == professor.cpf).first()
    if existente:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Disciplina já cadastrada para este(a) professor(a).")

    nova_disciplina = Disciplina(descricao=disciplina.descricao, professor=professor)

    db.add(nova_disciplina)
    db.commit()
    db.refresh(nova_disciplina)
    return nova_disciplina