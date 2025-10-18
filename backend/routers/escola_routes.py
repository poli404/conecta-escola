from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database.schemas import EscolaSchema
from database.dependencies import get_db
from database.models import Escola


escola_router = APIRouter(prefix="/escola", tags=["escola"])


@escola_router.get("/", response_model=list[EscolaSchema])
def listar_escolas(db: Session = Depends(get_db)):
    escolas = db.query(Escola).all()
    if not escolas:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="nenhuma escola cadastrada")
    return escolas
