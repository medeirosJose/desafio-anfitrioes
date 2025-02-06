import json
from sqlmodel import Field, Session, SQLModel, create_engine, select
from .models import Acomodacao 
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))  
jsonData = os.path.join(BASE_DIR, "data.json") 


sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"
connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, connect_args=connect_args)

def create_db_and_tables():
    """Cria as tabelas no banco de dados e popula com dados do JSON se estiver vazio."""
    SQLModel.metadata.create_all(engine)

    with Session(engine) as session:
        if not session.exec(select(Acomodacao)).first():  # Verifica se o banco está vazio
            try:
                with open(jsonData, "r", encoding="utf-8") as file:
                    dados = json.load(file)
                    acoms = [Acomodacao(**item) for item in dados]
                    session.add_all(acoms)
                    session.commit()
                    print("Banco de dados populado com dados fakes")
            except Exception as e:
                print(f"Erro ao carregar JSON: {e}")

def get_session():
    with Session(engine) as session:
        yield session
