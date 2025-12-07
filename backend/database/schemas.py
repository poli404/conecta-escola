from __future__ import annotations
from pydantic import BaseModel
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
    email: str

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
    historicoEscolar: Optional[str]
    id_escola: int
    id_responsavel: Optional[str] = None  # CPF do responsável (opcional)

    model_config = {"from_attributes": True}

class AlunoBaseResponse(PessoaResponseSchema):  # aluno sem responsável 
    nacionalidade: str
    naturalidade: str
    deficiencia: Optional[str]
    tipoSanguineo: TipoSanguineo
    alergia: Optional[str]
    situacaoAnoAnterior: bool
    certidaoNascimento: str
    carteiraVacinacao: str
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
    historicoEscolar: Optional[str]
    responsavel: Optional['ResponsavelBaseResponse']

    model_config = {"from_attributes": True}


class ResponsavelCreateSchema(PessoaCreateSchema):
    emailPessoal: str
    estadoCivil: EstadoCivil
    id_aluno: Optional[str] = None  # cpf
    id_escola: int

    model_config = {"from_attributes": True}

class ResponsavelBaseResponse(PessoaResponseSchema):
    emailPessoal: str
    estadoCivil: EstadoCivil

    model_config = {"from_attributes": True}

class ResponsavelResponseSchema(ResponsavelBaseResponse):
    alunos: list['AlunoBaseResponse'] 

    model_config = {"from_attributes": True}


class TurmaCreateSchema(BaseModel):
    ano_escolar: AnoEscolar
    identificador: str
    id_escola: int
    alunos: list[str] = []  # lista de CPFs dos alunos

    model_config = {"from_attributes": True}

class TurmaResponseSchema(BaseModel):
    id: int
    ano_escolar: AnoEscolar
    identificador: str
    escola: EscolaResponseSchema
    alunos_turma: list['AlunoTurmaResponseSchema']

    model_config = {"from_attributes": True}


class AlunoTurmaCreateSchema(BaseModel):
    data_matricula: date
    id_aluno: str
    id_turma: int

    model_config = {"from_attributes": True}

class AlunoTurmaResponseSchema(BaseModel):
    data_matricula: date
    aluno: AlunoBaseResponse  

    model_config = {"from_attributes": True}


class DisciplinaCreateSchema(BaseModel):
    descricao: str  # nome da disciplina (ex: "Matemática", "Português")
    id_professor: str

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

class NotaUpdateSchema(BaseModel):
    valor: float

    model_config = {"from_attributes": True}

class NotaResponseSchema(BaseModel):
    id: int
    valor: float
    data: date
    disciplina: DisciplinaResponseSchema 
    aluno: AlunoResponseSchema      

    model_config = {"from_attributes": True}


class TurmaDisciplinaCreateSchema(BaseModel):
    id_turma: int
    id_disciplina: int
    ano_letivo: int

    model_config = {"from_attributes": True}

class TurmaDisciplinaResponseSchema(BaseModel):
    ano_letivo: int
    disciplina: DisciplinaResponseSchema

    model_config = {"from_attributes": True}


class FaltaCreateSchema(BaseModel):
    data: date
    quantidade: int
    id_aluno: str
    id_disciplina: str

    model_config = {"from_attributes": True}

class FaltaUpdateSchema(BaseModel):
    justificada: bool

    model_config = {"from_attributes": True}

class FaltaResponseSchema(BaseModel):
    id: int
    data: date
    quantidade: int
    justificativa: bool
    aluno: AlunoBaseResponse
    disciplina: DisciplinaResponseSchema


AlunoResponseSchema.model_rebuild()
ResponsavelResponseSchema.model_rebuild()
TurmaResponseSchema.model_rebuild()
AlunoTurmaResponseSchema.model_rebuild()