from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date
from database.enums import *

class EscolaCreateSchema(BaseModel):
    nome: str
    cnpj: str
    endereco: str
    dominio: str
    senha: str

    model_config = {"from_attributes": True}

class EscolaResponseSchema(BaseModel):
    id: int 
    nome: str
    cnpj: str
    endereco: str
    dominio: str
    email: EmailStr 

    model_config = {"from_attributes": True}


class PessoaCreateSchema(BaseModel):
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

    model_config = {"from_attributes": True}

class PessoaResponseSchema(BaseModel):
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

    model_config = {"from_attributes": True}


class ProfessorCreateSchema(PessoaCreateSchema):
    emailPessoal: str
    graduacao: str
    cargaHoraria: float

    model_config = {"from_attributes": True}

class ProfessorResponseSchema(PessoaResponseSchema):
    emailPessoal: str
    graduacao: str
    cargaHoraria: float
    emailEscolar: EmailStr
    escola: EscolaResponseSchema

    model_config = {"from_attributes": True}