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
    id_escola: int

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
    id_aluno: str # cpf

    model_config = {"from_attributes": True}

class ResponsavelResponseSchema(PessoaResponseSchema):
    emailPessoal: str
    estadoCivil: EstadoCivil
    alunos: list[AlunoResponseSchema]

    model_config = {"from_attributes": True}


class TurmaCreateSchema(BaseModel):
    ano_escolar: AnoEscolar
    identificador: str
    id_escola: int

    model_config = {"from_attributes": True}

class TurmaResponseSchema(BaseModel):
    id: int
    ano_escolar: AnoEscolar
    identificador: str
    escola: EscolaResponseSchema
    alunos_turma: list[AlunoTurmaResponseSchema]

    model_config = {"from_attributes": True}


class AlunoTurmaCreateSchema(BaseModel):
    data_matricula: date
    id_aluno: str
    id_turma: int

    model_config = {"from_attributes": True}

class AlunoTurmaResponseSchema(BaseModel):
    data_matricula: date
    aluno: AlunoResponseSchema
    turma: TurmaResponseSchema

    model_config = {"from_attributes": True}


class DisciplinaCreateSchema(BaseModel):
    descricao: str
    id_professor: str  # cpf (FK)

    model_config = {"from_attributes": True}

class DisciplinaResponseSchema(BaseModel):
    id: int
    descricao: str
    professor: ProfessorResponseSchema

    model_config = {"from_attributes": True}


class NotaCreateSchema(BaseModel):
    valor: float
    data: date
    id_disciplina: int
    id_aluno: str

    model_config = {"from_attributes": True}

class NotaResponseSchema(BaseModel):
    id: int
    valor: float
    data: date
    disciplina: DisciplinaResponseSchema 
    aluno: AlunoResponseSchema      

    model_config = {"from_attributes": True}