from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload
from datetime import date

from database.schemas import NotaCreateSchema, NotaUpdateSchema, NotaResponseSchema
from database.dependencies import get_db
from database.models import Nota, Aluno, AlunoTurma, Disciplina, Professor, Responsavel
from routers.security import get_current_professor, get_current_aluno, get_current_user

nota_router = APIRouter(prefix="/nota", tags=["nota"])

@nota_router.post("/", response_model=NotaResponseSchema, status_code=status.HTTP_201_CREATED)
def cadastrar_nota(nota: NotaCreateSchema, db: Session = Depends(get_db), professor: Professor = Depends(get_current_professor)):
    """
    Cadastra uma nova nota para um aluno em uma disciplina.
    Apenas professores autenticados podem cadastrar notas.
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
def atualizar_nota(id_nota: int, nota: NotaUpdateSchema, db: Session = Depends(get_db), professor: Professor = Depends(get_current_professor)):
    """
    Altera a nota de um aluno em uma disciplina.
    Apenas professores autenticados podem alterar notas.
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
def listar_notas_por_aluno(cpf: str, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    """
    Lista todas as notas de um aluno específico.
    Professor pode ver notas de qualquer aluno.
    Responsável só pode ver notas dos próprios filhos.
    """
    cpf_limpo = cpf.replace(".", "").replace("-", "")
    
    if current_user["tipo"] == "responsavel":
        aluno = db.query(Aluno).filter(Aluno.cpf == cpf_limpo).first()
        if not aluno:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Aluno não encontrado.")
        
        responsavel: Responsavel = current_user["usuario"]
        if aluno.idResponsavel != responsavel.cpf:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Você só pode visualizar notas dos seus filhos.")
        
    elif current_user["tipo"] != "professor":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Acesso negado: apenas professores e responsáveis podem visualizar notas de alunos.")
    
    notas = db.query(Nota).filter(
        Nota.idAluno == cpf_limpo
    ).options(
        joinedload(Nota.aluno),
        joinedload(Nota.disciplina).joinedload(Disciplina.professor)
    ).all()
    
    return notas


@nota_router.get("/disciplina/{id_disciplina}", response_model=list[NotaResponseSchema])
def listar_notas_por_disciplina(id_disciplina: int, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    """
    Lista todas as notas de uma disciplina específica.
    Apenas professores e escola podem visualizar estas notas.
    """
    if current_user["tipo"] not in ["professor", "escola"]:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Acesso negado: apenas professores e escola podem visualizar notas por disciplina.")
    
    notas = db.query(Nota).filter(
        Nota.idDisciplina == id_disciplina
    ).options(
        joinedload(Nota.aluno),
        joinedload(Nota.disciplina).joinedload(Disciplina.professor)
    ).all()
    
    return notas


@nota_router.get("/turma/{id_turma}", response_model=list[NotaResponseSchema])
def listar_notas_por_turma(id_turma: int, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    """
    Lista todas as notas dos alunos matriculados em uma turma específica.
    Apenas professores e escola podem visualizar estas notas.
    """
    if current_user["tipo"] not in ["professor", "escola"]:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Acesso negado: apenas professores e escola podem visualizar notas por turma.")
    
    notas = db.query(Nota).join(Aluno).join(AlunoTurma).filter(
        AlunoTurma.idTurma == id_turma
    ).options(
        joinedload(Nota.aluno),
        joinedload(Nota.disciplina).joinedload(Disciplina.professor)
    ).all()
    
    return notas


@nota_router.get("/minhas", response_model=list[NotaResponseSchema])
def listar_minhas_notas(db: Session = Depends(get_db), aluno: Aluno = Depends(get_current_aluno)):
    """
    Lista todas as notas do aluno autenticado.
    """
    notas = db.query(Nota).filter(
        Nota.idAluno == aluno.cpf
    ).options(
        joinedload(Nota.disciplina).joinedload(Disciplina.professor)
    ).all()
    
    return notas