from pydantic import BaseModel
from typing import Optional


class EscolaSchema(BaseModel):
    nome: str
    cnpj: str
    endereco: str
    dominio: str
    email: Optional[str] = None
    senha: str

    model_config = {"from_attributes": True}
