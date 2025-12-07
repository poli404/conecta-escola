from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload

from database.schemas import ProfessorCreateSchema, ProfessorResponseSchema
from database.dependencies import get_db
from database.models import Professor, Escola
from routers.security import get_password_hash, get_current_escola

professor_router = APIRouter(prefix="/professor", tags=["professor"])

@professor_router.get("/", response_model=list[ProfessorResponseSchema])
def listar_professores(db: Session = Depends(get_db)):
    """
    Lista todos os professores cadastrados e a escola que está associado.
    """
    professores = db.query(Professor).options(joinedload(Professor.escola)).all()
    if not professores:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Nenhum professor cadastrado.")
    return professores


@professor_router.post("/cadastro", response_model=ProfessorResponseSchema, status_code=status.HTTP_201_CREATED)
def cadastrar_professor(professor: ProfessorCreateSchema, db: Session = Depends(get_db), escola_autenticada: Escola = Depends(get_current_escola)):
    """
    Cadastra um novo professor no sistema.
    Apenas escolas autenticadas podem cadastrar professores.
    """
    professor.cpf = professor.cpf.replace(".", "").replace("-", "")
    professor.rg = professor.rg.replace(".", "").replace("-", "")
    professor.cep = professor.cep.replace("-", "")
    professor.telefone = professor.telefone.replace("-", "")

    escola = db.query(Escola).filter(Escola.id == professor.id_escola).first()
    if not escola:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Escola não encontrada.")
    existente = db.query(Professor).filter(Professor.cpf == professor.cpf).first()
    if existente:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Professor(a) já cadastrado(a).")

    hashed_password = get_password_hash(professor.senha)
    novo_professor = Professor(**professor.model_dump(exclude={"senha", "id_escola"}), senha=hashed_password, escola=escola)

    db.add(novo_professor)
    db.commit()
    db.refresh(novo_professor)
    return novo_professor


@professor_router.get("/escola/{id_escola}", response_model=list[ProfessorResponseSchema])
def listar_professores_por_escola(id_escola: int, db: Session = Depends(get_db)):
    """
    Lista todos os professores de uma escola específica.
    """
    professores = db.query(Professor).filter(
        Professor.idEscola == id_escola
    ).options(joinedload(Professor.escola)).all()
    
    if not professores:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Nenhum professor encontrado para esta escola.")
    return professores