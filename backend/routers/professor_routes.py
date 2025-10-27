from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload

from database.schemas import ProfessorCreateSchema, ProfessorResponseSchema
from database.dependencies import get_db
from database.models import Professor, Escola


professor_router = APIRouter(prefix="/professor", tags=["professor"])


@professor_router.get("/", response_model=list[ProfessorResponseSchema])
def listar_professores(db: Session = Depends(get_db)):
    professores = db.query(Professor).options(joinedload(Professor.escola)).all()
    if not professores:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Nenhum professor cadastrado.")
    return professores

@professor_router.post("/cadastro/{id_escola}", response_model=ProfessorResponseSchema, status_code=status.HTTP_201_CREATED)
def cadastrar_professor(id_escola: int, professor: ProfessorCreateSchema, db: Session = Depends(get_db)):
    escola = db.query(Escola).filter(Escola.id == id_escola).first()
    if not escola:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Escola não encontrada.")
    existente = db.query(Professor).filter(Professor.cpf == professor.cpf).first()
    if existente:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Professor já cadastrado.")

    novo_professor = Professor(escola=escola, **professor.model_dump())
    db.add(novo_professor)
    db.commit()
    db.refresh(novo_professor)
    return novo_professor