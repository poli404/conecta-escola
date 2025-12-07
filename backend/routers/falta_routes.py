from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload

from database.dependencies import get_db
from database.models import Falta, Aluno, Disciplina, AlunoTurma, Turma
from database.schemas import FaltaCreateSchema, FaltaResponseSchema, FaltaUpdateSchema

falta_router = APIRouter(prefix="/falta", tags=["falta"])

@falta_router.post("/", response_model=FaltaResponseSchema, status_code=status.HTTP_201_CREATED)
def atribuir_falta(falta: FaltaCreateSchema, db: Session = Depends(get_db)):
    """
    Atribui falta a um aluno em uma disciplina específica.
    """
    falta.id_aluno = falta.id_aluno.replace(".", "").replace("-", "")
    
    aluno = db.query(Aluno).filter(Aluno.cpf == falta.id_aluno).first()
    if not aluno:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Aluno(a) não encontrado(a).")

    disciplina = db.query(Disciplina).filter(Disciplina.id == falta.id_disciplina).first()
    if not disciplina:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Disciplina não encontrada.")

    nova_falta = Falta(data=falta.data, quantidade=falta.quantidade, aluno=aluno, disciplina=disciplina)

    db.add(nova_falta)
    db.commit()
    db.refresh(nova_falta)
    return nova_falta

@falta_router.delete("/{id_falta}", status_code=status.HTTP_204_NO_CONTENT)
def remover_falta(id_falta: int, db: Session = Depends(get_db)):
    """
    Remove uma falta lançada incorretamente para um aluno em uma disciplina específica.
    """
    falta = db.query(Falta).filter(Falta.id == id_falta).first()
    
    if not falta:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Falta não encontrada.")
    
    db.delete(falta)
    db.commit()
    return None

@falta_router.put("/{id_falta}/justificar", response_model=FaltaResponseSchema)
def justificar_falta(id_falta: int, dados: FaltaUpdateSchema, db: Session = Depends(get_db)):
    """
    Permite marca ou desmarcar uma falta como justificada.
    Obs.: faltas justificadas não são consideradas para o limite de reprovação.
    """
    falta = db.query(Falta).filter(Falta.id == id_falta).first()
    
    if not falta:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Falta não encontrada.")
    
    falta.justificada = dados.justificada
    db.commit()
    db.refresh(falta)
    
    return falta

@falta_router.get("/aluno", response_model=list[FaltaResponseSchema])
def listar_faltas_disciplina(cpf: str, disciplina, db):
    pass