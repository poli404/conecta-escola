from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload
from datetime import date

from database.schemas import NotaCreateSchema, NotaUpdateSchema, NotaResponseSchema
from database.dependencies import get_db
from database.models import Nota, Aluno, AlunoTurma, Disciplina

nota_router = APIRouter(prefix="/nota", tags=["nota"])

@nota_router.post("/", response_model=NotaResponseSchema, status_code=status.HTTP_201_CREATED)
def cadastrar_nota(nota: NotaCreateSchema, db: Session = Depends(get_db)):
    """
    Cadastra uma nova nota para um aluno em uma disciplina.
    """
    cpf_aluno = nota.id_aluno.replace(".", "").replace("-", "")
    
    aluno = db.query(Aluno).filter(Aluno.cpf == cpf_aluno).first()
    if not aluno:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Aluno não encontrado.")
    
    disciplina = db.query(Disciplina).filter(Disciplina.id == nota.id_disciplina).first()
    if not disciplina:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Disciplina não encontrada.")
    
    if nota.valor < 0 or nota.valor > 10:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Nota deve estar entre 0 e 10.")
    
    nova_nota = Nota(
        valor=nota.valor,
        data=nota.data,
        disciplina=disciplina,
        aluno=aluno
    )
    
    db.add(nova_nota)
    db.commit()
    db.refresh(nova_nota)
    
    nota_completa = db.query(Nota).options(
        joinedload(Nota.aluno),
        joinedload(Nota.disciplina).joinedload(Disciplina.professor)
    ).filter(Nota.id == nova_nota.id).first()
    
    return nota_completa


@nota_router.put("/{id_nota}", response_model=NotaResponseSchema)
def atualizar_nota(id_nota: int, nota: NotaUpdateSchema, db: Session = Depends(get_db)):
    """
    Altera a nota de um aluno em uma disciplina.
    """
    nota_existente = db.query(Nota).filter(Nota.id == id_nota).first()
    if not nota_existente:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Nota não encontrada.")
    
    if nota.valor < 0 or nota.valor > 10:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Nota deve estar entre 0 e 10.")
    
    nota_existente.valor = nota.valor
    
    db.commit()
    db.refresh(nota_existente)
    
    nota_completa = db.query(Nota).options(
        joinedload(Nota.aluno),
        joinedload(Nota.disciplina).joinedload(Disciplina.professor)
    ).filter(Nota.id == id_nota).first()
    
    return nota_completa


@nota_router.get("/aluno/{cpf}", response_model=list[NotaResponseSchema])
def listar_notas_por_aluno(cpf: str, db: Session = Depends(get_db)):
    """
    Lista todas as notas de um aluno específico.
    """
    cpf_limpo = cpf.replace(".", "").replace("-", "")
    
    notas = db.query(Nota).filter(
        Nota.idAluno == cpf_limpo
    ).options(
        joinedload(Nota.aluno),
        joinedload(Nota.disciplina).joinedload(Disciplina.professor)
    ).all()
    
    if not notas:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Nenhuma nota encontrada para este aluno.")
    return notas


@nota_router.get("/disciplina/{id_disciplina}", response_model=list[NotaResponseSchema])
def listar_notas_por_disciplina(id_disciplina: int, db: Session = Depends(get_db)):
    """
    Lista todas as notas de uma disciplina específica.
    """
    notas = db.query(Nota).filter(
        Nota.idDisciplina == id_disciplina
    ).options(
        joinedload(Nota.aluno),
        joinedload(Nota.disciplina).joinedload(Disciplina.professor)
    ).all()
    
    if not notas:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Nenhuma nota encontrada para esta disciplina.")
    return notas


@nota_router.get("/turma/{id_turma}", response_model=list[NotaResponseSchema])
def listar_notas_por_turma(id_turma: int, db: Session = Depends(get_db)):
    """
    Lista todas as notas dos alunos matriculados em uma turma específica.
    """
    notas = db.query(Nota).join(Aluno).join(AlunoTurma).filter(
        AlunoTurma.idTurma == id_turma
    ).options(
        joinedload(Nota.aluno),
        joinedload(Nota.disciplina).joinedload(Disciplina.professor)
    ).all()
    
    if not notas:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Nenhuma nota encontrada para alunos desta turma.")
    return notas