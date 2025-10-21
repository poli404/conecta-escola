from dotenv import load_dotenv
import os
from database.enums import *
from sqlalchemy import create_engine, Column, Date, Enum, Float, ForeignKey, Integer, String
from sqlalchemy.orm import declarative_base, sessionmaker

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
    cnpj = Column("cnpj", String(14), nullable=False, unique=True)
    endereco = Column("endereco", String(255), nullable=False)
    dominio = Column("dominio", String(100), nullable=False, unique=True)
    email = Column("email", String(255), unique=True)
    senha = Column("senha", String(255), nullable=False)

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
    rg = Column("rg", String(15), nullable=False)
    corRaca = Column("corRaca", Enum(CorRaca), nullable=False)
    endereco = Column("endereco", String(255), nullable=False)
    cep = Column("cep", String(8), nullable=False)
    uf = Column("uf", Enum(Uf), nullable=False)
    dataNasc = Column("dataNasc", Date, nullable=False)
    genero = Column("genero", Enum(Genero), nullable=False)
    telefone = Column("telefone", String(11), nullable=False)
    senha = Column("senha", String(255), nullable=False)
    tipo = Column("tipo", Enum(TipoPessoa), nullable=False, default=TipoPessoa.PESSOA)

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
        self.tipo = TipoPessoa.PESSOA

    __mapper_args__ = {
        "polymorphic_on": tipo,
        # "polymorphic_identity": TipoPessoa.PESSOA,
        "with_polymorphic": "*"  # permite retornar objetos das subclasses
    }

class Professor(Pessoa):
    __tablename__ = "professores"
    cpf = Column("cpf", String(11), ForeignKey("pessoas.cpf"), primary_key=True)
    email = Column("email", String(255), nullable=False, unique=True)
    graduacao = Column("graduacao", String(255), nullable=False)
    cargaHoraria = Column("carga_horaria", Float, nullable=False)

    def __init__(self, nome, cpf, rg, corRaca, endereco, cep, uf, dataNasc, genero, telefone, senha, email, graduacao, cargaHoraria):
        super().__init__(nome, cpf, rg, corRaca, endereco, cep, uf, dataNasc, genero, telefone, senha)
        self.email = email  # pensar melhor, talvez o ideal seria o sistema gerar para ele fazer login (?)
        self.graduacao = graduacao
        self.cargaHoraria = cargaHoraria

    __mapper_args__ = { "polymorphic_identity": TipoPessoa.PROFESSOR }


Base.metadata.create_all(bind=db)