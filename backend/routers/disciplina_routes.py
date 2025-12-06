from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload

from database.schemas import DisciplinaCreateSchema, DisciplinaResponseSchema, TurmaDisciplinaCreateSchema, TurmaDisciplinaResponseSchema
from database.dependencies import get_db
from database.models import Disciplina, Professor, Turma, TurmaDisciplina, Escola
from routers.security import get_current_escola

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
def cadastrar_disciplina(disciplina: DisciplinaCreateSchema, db: Session = Depends(get_db), escola_autenticada: Escola = Depends(get_current_escola)):
    """
    Cadastra uma nova disciplina no sistema.
    Apenas escolas autenticadas podem cadastrar disciplinas.
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


@disciplina_router.post("/turma", response_model=TurmaDisciplinaResponseSchema, status_code=status.HTTP_201_CREATED)
def associar_turma_disciplina(associacao: TurmaDisciplinaCreateSchema, db: Session = Depends(get_db), escola_autenticada: Escola = Depends(get_current_escola)):
    """
    Associa uma disciplina a uma turma.
    Apenas escolas autenticadas podem fazer associações.
    """
    turma = db.query(Turma).filter(Turma.id == associacao.id_turma).first()
    if not turma:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Turma não encontrada.")
    
    disciplina = db.query(Disciplina).filter(Disciplina.id == associacao.id_disciplina).first()
    if not disciplina:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Disciplina não encontrada.")
    
    existente = db.query(TurmaDisciplina).filter(
        TurmaDisciplina.idTurma == associacao.id_turma,
        TurmaDisciplina.idDisciplina == associacao.id_disciplina
    ).first()
    if existente:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Disciplina já associada a esta turma.")
    
    nova_associacao = TurmaDisciplina(ano_letivo=associacao.ano_letivo)
    nova_associacao.turma = turma
    nova_associacao.disciplina = disciplina
    
    db.add(nova_associacao)
    db.commit()
    db.refresh(nova_associacao)
    return nova_associacao


@disciplina_router.get("/turma/{id_turma}", response_model=list[DisciplinaResponseSchema])
def listar_disciplinas_por_turma(id_turma: int, db: Session = Depends(get_db)):
    """
    Lista todas as disciplinas ministradas em uma turma específica.
    """
    disciplinas = db.query(Disciplina).join(TurmaDisciplina).filter(
        TurmaDisciplina.idTurma == id_turma
    ).options(joinedload(Disciplina.professor)).all()
    
    if not disciplinas:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Nenhuma disciplina encontrada para esta turma.")
    return disciplinas


@disciplina_router.get("/professor/{cpf}", response_model=list[DisciplinaResponseSchema])
def listar_disciplinas_por_professor(cpf: str, db: Session = Depends(get_db)):
    """
    Lista todas as disciplinas ministradas por um professor específico.
    """
    cpf_limpo = cpf.replace(".", "").replace("-", "")
    
    disciplinas = db.query(Disciplina).filter(
        Disciplina.idProfessor == cpf_limpo
    ).options(joinedload(Disciplina.professor)).all()
    
    if not disciplinas:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Nenhuma disciplina encontrada para este professor.")
    return disciplinas


@disciplina_router.get("/escola/{id_escola}", response_model=list[DisciplinaResponseSchema])
def listar_disciplinas_por_escola(id_escola: int, db: Session = Depends(get_db)):
    """
    Lista todas as disciplinas de uma escola específica.
    """
    disciplinas = db.query(Disciplina).join(Professor).filter(
        Professor.idEscola == id_escola
    ).options(joinedload(Disciplina.professor)).all()
    
    if not disciplinas:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Nenhuma disciplina encontrada para esta escola.")
    return disciplinas