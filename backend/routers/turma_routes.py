from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload
from datetime import date

from database.schemas import TurmaCreateSchema, TurmaResponseSchema
from database.dependencies import get_db
from database.models import Turma, Escola, Aluno, AlunoTurma

turma_router = APIRouter(prefix="/turma", tags=["turma"])

@turma_router.get("/", response_model=list[TurmaResponseSchema])
def listar_turmas(db: Session = Depends(get_db)):
    """
    Lista todas as turmas cadastradas com escola e alunos matriculados.
    """
    turmas = db.query(Turma).options(
        joinedload(Turma.escola),
        joinedload(Turma.alunos_turma).joinedload(AlunoTurma.aluno)
    ).all()
    if not turmas:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Nenhuma turma cadastrada.")
    return turmas


@turma_router.post("/cadastro", response_model=TurmaResponseSchema, status_code=status.HTTP_201_CREATED)
def cadastrar_turma(turma: TurmaCreateSchema, db: Session = Depends(get_db)):
    """
    Cadastra uma nova turma no sistema com os alunos associados.
    """
    escola = db.query(Escola).filter(Escola.id == turma.id_escola).first()
    if not escola:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Escola não encontrada.")
    
    existente = db.query(Turma).filter(Turma.ano_escolar == turma.ano_escolar, Turma.identificador == turma.identificador, Turma.idEscola == turma.id_escola).first()
    if existente:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Turma já cadastrada.")

    nova_turma = Turma(**turma.model_dump(exclude={"id_escola", "alunos"}), escola=escola)
    db.add(nova_turma)
    db.flush()  # gera o ID da turma sem commitar
    
    if turma.alunos: 
        data_hoje = date.today()
        for cpf in turma.alunos: 
            cpf_limpo = cpf.replace(".", "").replace("-", "")
            aluno = db.query(Aluno).filter(Aluno.cpf == cpf_limpo, Aluno.idEscola == turma.id_escola).first()
            if not aluno:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Aluno com CPF terminado em {cpf_limpo[-4:]} não encontrado ou não pertence a esta escola.")
            aluno_turma = AlunoTurma(data_matricula=data_hoje)
            aluno_turma.aluno = aluno
            aluno_turma.turma = nova_turma
            db.add(aluno_turma)
    
    db.commit()

    # Recarrega a turma com todos os relacionamentos
    turma_completa = db.query(Turma).options(joinedload(Turma.escola), joinedload(Turma.alunos_turma).joinedload(AlunoTurma.aluno)).filter(Turma.id == nova_turma.id).first()
    
    return turma_completa