from dotenv import load_dotenv
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base

# cria conexão e base do banco
DB_URL = os.getenv("DB_URL")
db = create_engine(DB_URL)
Base = declarative_base()

class Escola(Base):
    pass