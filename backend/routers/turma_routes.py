from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload
from datetime import date

from database.schemas import TurmaCreateSchema, TurmaUpdateSchema, TurmaResponseSchema
from database.dependencies import get_db
from database.models import Turma, Escola, Aluno, Disciplina, AlunoTurma, TurmaDisciplina
from routers.security import get_current_escola

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
def cadastrar_turma(turma: TurmaCreateSchema, db: Session = Depends(get_db), escola_autenticada: Escola = Depends(get_current_escola)):
    """
    Cadastra uma nova turma no sistema com os alunos associados.
    Apenas escolas autenticadas podem cadastrar turmas.
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


@turma_router.get("/{id_turma}", response_model=TurmaResponseSchema)
def buscar_turma(id_turma: int, db: Session = Depends(get_db)):
    """
    Busca uma turma específica por ID.
    """
    turma = db.query(Turma).options(
        joinedload(Turma.escola),
        joinedload(Turma.alunos_turma).joinedload(AlunoTurma.aluno)
    ).filter(Turma.id == id_turma).first()
    
    if not turma:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Turma não encontrada.")
    return turma


@turma_router.get("/professor/{cpf}", response_model=list[TurmaResponseSchema])
def listar_turmas_por_professor(cpf: str, db: Session = Depends(get_db)):
    """
    Lista todas as turmas que possuem disciplinas ministradas por um professor específico.
    """
    cpf_limpo = cpf.replace(".", "").replace("-", "")
    
    turmas = db.query(Turma).join(TurmaDisciplina).join(Disciplina).filter(
        Disciplina.idProfessor == cpf_limpo
    ).options(
        joinedload(Turma.escola),
        joinedload(Turma.alunos_turma).joinedload(AlunoTurma.aluno)
    ).distinct().all()
    
    if not turmas:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Nenhuma turma encontrada para este professor.")
    return turmas


@turma_router.get("/disciplina/{id_disciplina}", response_model=list[TurmaResponseSchema])
def listar_turmas_por_disciplina(id_disciplina: int, db: Session = Depends(get_db)):
    """
    Lista todas as turmas que possuem uma disciplina específica.
    """
    turmas = db.query(Turma).join(TurmaDisciplina).filter(
        TurmaDisciplina.idDisciplina == id_disciplina
    ).options(
        joinedload(Turma.escola),
        joinedload(Turma.alunos_turma).joinedload(AlunoTurma.aluno)
    ).all()
    
    if not turmas:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Nenhuma turma encontrada para esta disciplina.")
    return turmas


@turma_router.get("/escola/{id_escola}", response_model=list[TurmaResponseSchema])
def listar_turmas_por_escola(id_escola: int, db: Session = Depends(get_db)):
    """
    Lista todas as turmas de uma escola específica.
    """
    turmas = db.query(Turma).filter(Turma.idEscola == id_escola).options(
        joinedload(Turma.escola),
        joinedload(Turma.alunos_turma).joinedload(AlunoTurma.aluno)
    ).all()
    
    if not turmas:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Nenhuma turma encontrada para esta escola.")
    return turmas


@turma_router.put("/{id_turma}/alunos", response_model=TurmaResponseSchema)
def atualizar_turma(id_turma: int, dados: TurmaUpdateSchema, db: Session = Depends(get_db), escola: Escola = Depends(get_current_escola)):
    """
    Permite a inclusão de novos alunos em uma turma já criada.
    """
    turma = db.query(Turma).filter(Turma.id == id_turma).first()
    
    if not turma:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Turma não encontrada.")

    data = date.today()

    for cpf in dados.alunos_novos:
        aluno = db.query(Aluno).filter(Aluno.cpf == cpf, Aluno.idEscola == escola.id).first()

        if not aluno:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Aluno(a) com CPF {cpf} não encontrado.")

        matricula_existente = db.query(AlunoTurma).filter(AlunoTurma.idTurma == turma.id, AlunoTurma.idAluno == aluno.cpf).first()

        if not matricula_existente:  # se o aluno já não estava na turma, pode ser adicionado
            nova_matricula = AlunoTurma(data_matricula=data)
            nova_matricula.aluno = aluno
            nova_matricula.turma = turma
            db.add(nova_matricula)

    db.commit()

    turma_atualizada = db.query(Turma).options(joinedload(Turma.escola), joinedload(Turma.alunos_turma).joinedload(AlunoTurma.aluno)).filter(Turma.id == id_turma).first()
    
    return turma_atualizada