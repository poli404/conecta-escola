from pydantic import BaseModel
from typing import Optional
from datetime import date
from database.enums import *

class EscolaSchema(BaseModel):
    nome: str
    cnpj: str
    endereco: str
    dominio: str
    # email: Optional[str] = None
    senha: str

    model_config = {"from_attributes": True}


class PessoaSchema(BaseModel):
    nome: str
    cpf: str
    rg: str
    corRaca: CorRaca
    endereco: str
    cep: str
    uf: Uf
    dataNasc: date
    genero: Genero
    telefone: str
    senha: str
    tipo: Optional[TipoPessoa] = None

    model_config = {"from_attributes": True}

class ProfessorSchema(PessoaSchema):
    email: str
    graduacao: str
    cargaHoraria: float

    model_config = {"from_attributes": True}