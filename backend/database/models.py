from dotenv import load_dotenv
import os
from sqlalchemy import create_engine, Column, Integer, String
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
    email = Column("email", String(255), nullable=False, unique=True)
    senha = Column("senha", String(255), nullable=False)

    def __init__(self, nome, cnpj, endereco, dominio, senha):
        self.nome = nome
        self.cnpj = cnpj
        self.endereco = endereco
        self.dominio = dominio
        self.email = "coordenacao@" + dominio + ".br"
        self.senha = senha


Base.metadata.create_all(bind=db)