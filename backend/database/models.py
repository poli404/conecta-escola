from dotenv import load_dotenv
import os
from database.enums import *
import unicodedata
from sqlalchemy import create_engine, Boolean, Column, Date, Enum, Float, ForeignKey, Integer, String
from sqlalchemy.orm import declarative_base, relationship, sessionmaker

# cria conexão e base do banco
load_dotenv()  # carrega .env se existir
DB_URL = os.getenv("DB_URL")  # DB_URL=mysql+pymysql://user:password@localhost:port/mydatabase
db = create_engine(DB_URL, echo=False, future=True)
SessionLocal = sessionmaker(bind=db, autoflush=False, autocommit=False, future=True)
Base = declarative_base()


class Escola(Base):
    __tablename__ = "escolas"
    id = Column("id", Integer, primary_key=True, autoincrement=True)
    nome = Column("nome", String(255), nullable=False)
    cnpj = Column("cnpj", String(24), nullable=False, unique=True)
    endereco = Column("endereco", String(255), nullable=False)
    dominio = Column("dominio", String(100), nullable=False, unique=True)
    email = Column("email", String(255), unique=True)
    senha = Column("senha", String(255), nullable=False)

    # relacionamento com professor, turma e aluno
    professores = relationship("Professor", back_populates="escola")
    turmas = relationship("Turma", back_populates="escola")
    alunos = relationship("Aluno", back_populates="escola")

    def __init__(self, nome, cnpj, endereco, dominio, senha):
        self.nome = nome
        self.cnpj = cnpj
        self.endereco = endereco
        self.dominio = dominio
        self.email = f"coordenacao@{dominio}.br"
        self.senha = senha


class Pessoa(Base):
    __tablename__ = "pessoas"
    nome = Column("nome", String(255), nullable=False)
    cpf = Column("cpf", String(11), primary_key=True)
    rg = Column("rg", String(14), nullable=False)
    corRaca = Column("cor_raca", Enum(CorRaca), nullable=False)
    endereco = Column("endereco", String(255), nullable=False)
    cep = Column("cep", String(8), nullable=False)
    uf = Column("uf", Enum(Uf), nullable=False)
    dataNasc = Column("data_nasc", Date, nullable=False)
    genero = Column("genero", Enum(Genero), nullable=False)
    telefone = Column("telefone", String(11), nullable=False)
    senha = Column("senha", String(255), nullable=False)
    tipo = Column("tipo", Enum(TipoPessoa), nullable=False) #, default=TipoPessoa.PESSOA)

    def __init__(self, nome, cpf, rg, corRaca, endereco, cep, uf, dataNasc, genero, telefone, senha):
        self.nome = nome
        self.cpf = cpf
        self.rg = rg
        self.corRaca = corRaca
        self.endereco = endereco
        self.cep = cep
        self.uf = uf
        self.telefone = telefone
        self.dataNasc = dataNasc
        self.genero = genero
        self.senha = senha
        #self.tipo = TipoPessoa.PESSOA

    __mapper_args__ = {"polymorphic_on": tipo, "with_polymorphic": "*"}  # permite retornar objetos das subclasses


class Professor(Pessoa):
    __tablename__ = "professores"
    cpf = Column("cpf", String(11), ForeignKey("pessoas.cpf"), primary_key=True)
    emailPessoal = Column("email_pessoal", String(255), nullable=False)
    emailEscolar = Column("email_escolar", String(255), unique=True)
    graduacao = Column("graduacao", String(255), nullable=False)
    cargaHoraria = Column("carga_horaria", Float, nullable=False)

    # relacionamento com escola e disciplina
    idEscola = Column("id_escola", Integer, ForeignKey("escolas.id"), nullable=False)
    escola = relationship("Escola", back_populates="professores")
    disciplinas = relationship("Disciplina", back_populates="professor")

    def __init__(self, nome, cpf, rg, corRaca, endereco, cep, uf, dataNasc, genero, telefone, senha, emailPessoal, graduacao, cargaHoraria, escola):
        super().__init__(nome, cpf, rg, corRaca, endereco, cep, uf, dataNasc, genero, telefone, senha)
        self.emailPessoal = emailPessoal
        self.emailEscolar = self.gerar_email(nome, escola.dominio)
        self.graduacao = graduacao
        self.cargaHoraria = cargaHoraria
        self.escola = escola
        #self.tipo = TipoPessoa.PROFESSOR

    @staticmethod
    def gerar_email(nome, dominio) -> str:
        nome_sem_acento = ''.join(c for c in unicodedata.normalize('NFD', nome) if unicodedata.category(c) != 'Mn')
        nome_formatado = nome_sem_acento.lower().replace(" ", "")
        return f"{nome_formatado}@{dominio}.br"

    __mapper_args__ = {"polymorphic_identity": TipoPessoa.PROFESSOR}


class Aluno(Pessoa):
    __tablename__ = "alunos"
    cpf = Column("cpf", String(11), ForeignKey("pessoas.cpf"), primary_key=True)
    nacionalidade = Column("nacionalidade", String(255), nullable=False)
    naturalidade = Column("naturalidade", String(255), nullable=False)
    deficiencia = Column("deficiencia", String(255))
    tipoSanguineo = Column("tipo_sanguineo", Enum(TipoSanguineo), nullable=False)
    alergia = Column("alergia", String(255))
    situacaoAnoAnterior = Column("situacao_ano_anterior", Boolean, nullable=False)
    certidaoNascimento = Column("certidao_nascimento", String(255), nullable=False)
    carteiraVacinacao = Column("carteira_vacinacao", String(255), nullable=False)
    historicoEscolar = Column("historico_escolar", String(255), nullable=True)

    # relacionamento com escola, responsável, nota e aluno_turma
    idEscola = Column("id_escola", Integer, ForeignKey("escolas.id"), nullable=False)
    escola = relationship("Escola", back_populates="alunos")
    idResponsavel = Column("id_responsavel", String(11), ForeignKey("responsaveis.cpf"), nullable=True)
    responsavel = relationship("Responsavel", back_populates="alunos", foreign_keys=[idResponsavel])
    notas = relationship("Nota", back_populates="aluno")
    turmas_aluno = relationship("AlunoTurma", back_populates="aluno")
    
    def __init__(self, nome, cpf, rg, corRaca, endereco, cep, uf, dataNasc, genero, telefone, senha, nacionalidade, naturalidade, deficiencia,
                 tipoSanguineo, alergia, situacaoAnoAnterior, certidaoNascimento, carteiraVacinacao, historicoEscolar, escola):
        super().__init__(nome, cpf, rg, corRaca, endereco, cep, uf, dataNasc, genero, telefone, senha)
        self.nacionalidade = nacionalidade
        self.naturalidade = naturalidade
        self.deficiencia = deficiencia
        self.tipoSanguineo = tipoSanguineo
        self.alergia = alergia
        self.situacaoAnoAnterior = situacaoAnoAnterior
        self.certidaoNascimento = certidaoNascimento
        self.carteiraVacinacao = carteiraVacinacao
        self.historicoEscolar = historicoEscolar
        self.escola = escola
        
        #self.tipo = TipoPessoa.ALUNO

    __mapper_args__ = {"polymorphic_identity": TipoPessoa.ALUNO}


class Responsavel(Pessoa):
    __tablename__ = "responsaveis"
    cpf = Column("cpf", String(11), ForeignKey("pessoas.cpf"), primary_key=True)
    emailPessoal = Column("email_pessoal", String(255), nullable=False)
    estadoCivil = Column("estado_civil", Enum(EstadoCivil), nullable=False)

    # relacionamento com aluno
    alunos = relationship("Aluno", back_populates="responsavel", foreign_keys="Aluno.idResponsavel")

    def __init__(self, nome, cpf, rg, corRaca, endereco, cep, uf, dataNasc, genero, telefone, senha, emailPessoal, estadoCivil, aluno):
        super().__init__(nome, cpf, rg, corRaca, endereco, cep, uf, dataNasc, genero, telefone, senha)
        self.emailPessoal = emailPessoal
        self.estadoCivil = estadoCivil
        self.alunos.append(aluno)

    __mapper_args__ = {"polymorphic_identity": TipoPessoa.RESPONSAVEL}


class Disciplina(Base):
    __tablename__ = "disciplinas"
    id = Column("id", Integer, primary_key=True, autoincrement=True)
    descricao = Column("descricao", String(255), nullable=False)

    # relacionamento com professor, nota e falta
    idProfessor = Column("id_professor", String(11), ForeignKey("professores.cpf"), nullable=False)
    professor = relationship("Professor", back_populates="disciplinas")
    notas = relationship("Nota", back_populates="disciplina")
    turmas_disciplina = relationship("TurmaDisciplina", back_populates="disciplina")
    faltas = relationship("Falta", back_populates="disciplinas")

    def __init__(self, descricao, professor):
        self.descricao = descricao
        self.professor = professor


class Nota(Base):
    __tablename__ = "notas"
    id = Column("id", Integer, primary_key=True, autoincrement=True)
    valor = Column("valor", Float, nullable=False)
    data = Column("data", Date, nullable=False)

    # relacionamento com disciplina e aluno
    idDisciplina = Column("id_disciplina", Integer, ForeignKey("disciplinas.id"), nullable=False)
    disciplina = relationship("Disciplina", back_populates="notas")
    idAluno = Column("id_aluno", String(11), ForeignKey("alunos.cpf"), nullable=False)
    aluno = relationship("Aluno", back_populates="notas")

    def __init__(self, valor, data, disciplina, aluno):
        self.valor = valor
        self.data = data
        self.disciplina = disciplina
        self.aluno = aluno


class Turma(Base):
    __tablename__ = "turmas"
    id = Column("id", Integer, primary_key=True, autoincrement=True)
    ano_escolar = Column("ano_escolar", Enum(AnoEscolar), nullable=False)
    identificador = Column("identificador", String(1), nullable=False)

    # relacionamento com escola, aluno_turma e turma_disciplina
    idEscola = Column("id_escola", Integer, ForeignKey("escolas.id"), nullable=False)
    escola = relationship("Escola", back_populates="turmas")
    alunos_turma = relationship("AlunoTurma", back_populates="turma")
    disciplinas_turma = relationship("TurmaDisciplina", back_populates="turma")

    def __init__(self, ano_escolar, identificador, escola):
        self.ano_escolar = ano_escolar
        self.identificador = identificador
        self.escola = escola


class AlunoTurma(Base):
    __tablename__ = "alunos_turmas"
    data_matricula = Column("data_matricula", Date, nullable=False)

    # relacionamento com aluno e turma
    idAluno = Column("id_aluno", String(11), ForeignKey("alunos.cpf"), primary_key=True)
    aluno = relationship("Aluno", back_populates="turmas_aluno")
    idTurma = Column("id_turma", Integer, ForeignKey("turmas.id"), primary_key=True)
    turma = relationship("Turma", back_populates="alunos_turma")

    def __init__(self, data_matricula):
        self.data_matricula = data_matricula


class TurmaDisciplina(Base):
    __tablename__ = "turmas_disciplinas"
    ano_letivo = Column("ano_letivo", Integer, nullable=False)

    # relacionamento com turma e disciplina
    idTurma = Column("id_turma", Integer, ForeignKey("turmas.id"), primary_key=True)
    turma = relationship("Turma", back_populates="disciplinas_turma")
    idDisciplina = Column("id_disciplina", Integer, ForeignKey("disciplinas.id"), primary_key=True)
    disciplina = relationship("Disciplina", back_populates="turmas_disciplina")

    def __init__(self, ano_letivo):
        self.ano_letivo = ano_letivo


class Falta(Base):
    __tablename__ = "faltas"
    id = Column("id", Integer, primary_key=True, autoincrement=True)
    data = Column("data", Date, nullable=False)
    justificada = Column("justificada", Boolean, default=False)
    quantidade = Column("justificada", Integer)

    # relacionamento com aluno e disciplina
    idAluno = Column("id_aluno", String(11), ForeignKey("alunos.cpf"), nullable=False)
    aluno = relationship("Aluno")  # talvez precise de backref
    idDisciplina = Column("id_disciplina", Integer, ForeignKey("disciplinas.id"), nullable=False)
    disciplina = relationship("Disciplina", back_populates="faltas")

    def __init__(self, data, quantidade, aluno, disciplina):
        self.data = data
        self.quantidade = quantidade
        self.aluno = aluno
        self.disciplina = disciplina


Base.metadata.create_all(bind=db)