from __future__ import annotations
from pydantic import BaseModel
# from pydantic import EmailStr
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
    email: str  # email: EmailStr 

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
    emailEscolar: str
    escola: EscolaResponseSchema

    model_config = {"from_attributes": True}


class AlunoCreateSchema(PessoaCreateSchema):
    nacionalidade: str
    naturalidade: str
    deficiencia: Optional[str]
    tipoSanguineo: TipoSanguineo
    alergia: Optional[str]
    situacaoAnoAnterior: bool
    certidaoNascimento: str
    carteiraVacinacao: str
    anoEscolar: int
    historicoEscolar: Optional[str]

    model_config = {"from_attributes": True}

class AlunoResponseSchema(PessoaResponseSchema):
    nacionalidade: str
    naturalidade: str
    deficiencia: Optional[str]
    tipoSanguineo: TipoSanguineo
    alergia: Optional[str]
    situacaoAnoAnterior: bool
    certidaoNascimento: str
    carteiraVacinacao: str
    anoEscolar: int
    historicoEscolar: Optional[str]
    responsavel: Optional[ResponsavelResponseSchema]

    model_config = {"from_attributes": True}

class ResponsavelCreateSchema(PessoaCreateSchema):
    emailPessoal: str
    estadoCivil: EstadoCivil
    idAluno: str # cpf

    model_config = {"from_attributes": True}

class ResponsavelResponseSchema(PessoaResponseSchema):
    emailPessoal: str
    estadoCivil: EstadoCivil
    alunos: list[AlunoResponseSchema]  # alunos: list["AlunoResponseSchema"]

    model_config = {"from_attributes": True}