from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload

# Importações de Schemas, Dependências, Modelos e Segurança
from database.schemas import AlunoCreateSchema, AlunoResponseSchema
from database.dependencies import get_db
from database.models import Aluno, Responsavel, Escola, AlunoTurma, Turma
from database.enums import AnoEscolar
from routers.security import get_password_hash, get_current_escola

aluno_router = APIRouter(prefix="/aluno", tags=["aluno"])

@aluno_router.get("/", response_model=list[AlunoResponseSchema])
def listar_alunos(db: Session = Depends(get_db)):
    """
    Lista todos os alunos cadastrados e seu responsável associado.
    """
    alunos = db.query(Aluno).options(joinedload(Aluno.responsavel)).all()
    if not alunos:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Nenhum aluno(a) cadastrado.")
    return alunos


@aluno_router.post("/cadastro", response_model=AlunoResponseSchema, status_code=status.HTTP_201_CREATED)
def cadastrar_aluno(aluno: AlunoCreateSchema, db: Session = Depends(get_db), escola_autenticada: Escola = Depends(get_current_escola)):
    """
    Cadastra um novo aluno no sistema.
    Apenas escolas autenticadas podem cadastrar alunos.
    """
    aluno.cpf = aluno.cpf.replace(".", "").replace("-", "")
    aluno.rg = aluno.rg.replace(".", "").replace("-", "")
    aluno.cep = aluno.cep.replace("-", "")
    aluno.telefone = aluno.telefone.replace("-", "").replace("(", "").replace(")", "")

    escola = db.query(Escola).filter(Escola.id == aluno.id_escola).first()
    if not escola:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Escola não encontrada.")

    existente = db.query(Aluno).filter(Aluno.cpf == aluno.cpf).first()
    if existente:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Aluno(a) já cadastrado(a).")

    responsavel = None
    if aluno.id_responsavel:
        cpf_responsavel = aluno.id_responsavel.replace(".", "").replace("-", "")
        responsavel = db.query(Responsavel).filter(Responsavel.cpf == cpf_responsavel).first()
        if not responsavel:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Responsável não encontrado.") 

    hashed_password = get_password_hash(aluno.senha)
    novo_aluno = Aluno(**aluno.model_dump(exclude={"senha", "id_escola", "id_responsavel"}), senha=hashed_password, escola=escola)
    
    if responsavel:
        novo_aluno.responsavel = responsavel

    db.add(novo_aluno)
    db.commit()
    db.refresh(novo_aluno)
    return novo_aluno


@aluno_router.get("/{cpf}", response_model=AlunoResponseSchema)
def buscar_aluno(cpf: str, db: Session = Depends(get_db)):
    """
    Busca um aluno específico por CPF.
    """
    cpf_limpo = cpf.replace(".", "").replace("-", "")
    
    aluno = db.query(Aluno).options(joinedload(Aluno.responsavel)).filter(
        Aluno.cpf == cpf_limpo
    ).first()
    
    if not aluno:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Aluno não encontrado.")
    return aluno


@aluno_router.get("/turma/{id_turma}", response_model=list[AlunoResponseSchema])
def listar_alunos_por_turma(id_turma: int, db: Session = Depends(get_db)):
    """
    Lista todos os alunos matriculados em uma turma específica.
    """ 
    alunos = db.query(Aluno).join(AlunoTurma).filter(
        AlunoTurma.idTurma == id_turma
    ).options(joinedload(Aluno.responsavel)).all()
    
    if not alunos:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Nenhum aluno encontrado para esta turma.")
    return alunos


@aluno_router.get("/responsavel/{cpf}", response_model=list[AlunoResponseSchema])
def listar_alunos_por_responsavel(cpf: str, db: Session = Depends(get_db)):
    """
    Lista todos os alunos associados a um responsável específico.
    """
    cpf_limpo = cpf.replace(".", "").replace("-", "")
    
    alunos = db.query(Aluno).filter(
        Aluno.idResponsavel == cpf_limpo
    ).options(joinedload(Aluno.responsavel)).all()
    
    if not alunos:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Nenhum aluno encontrado para este responsável.")
    return alunos


@aluno_router.get("/escola/{id_escola}", response_model=list[AlunoResponseSchema])
def listar_alunos_por_escola(id_escola: int, db: Session = Depends(get_db)):
    """
    Lista todos os alunos matriculados em uma escola específica.
    """
    alunos = db.query(Aluno).filter(
        Aluno.idEscola == id_escola
    ).options(joinedload(Aluno.responsavel)).all()
    
    if not alunos:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Nenhum aluno encontrado para esta escola.")
    return alunos


@aluno_router.get("/escola/{id_escola}/ano/{ano_escolar}", response_model=list[AlunoResponseSchema])
def listar_alunos_por_escola_e_ano(id_escola: int, ano_escolar: AnoEscolar, db: Session = Depends(get_db)):
    """
    Lista todos os alunos de uma escola específica que estão matriculados em turmas de um determinado ano escolar.
    """
    alunos = db.query(Aluno).join(AlunoTurma).join(Turma).filter(
        Aluno.idEscola == id_escola,
        Turma.ano_escolar == ano_escolar
    ).options(joinedload(Aluno.responsavel)).distinct().all()
    
    return alunos