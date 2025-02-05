import json
from typing import Annotated, List, Optional
from fastapi import Depends, FastAPI, HTTPException, Query
from sqlmodel import Field, Session, SQLModel, create_engine, select
from fastapi.middleware.cors import CORSMiddleware

# dados mockados de inicio, usado somente quando o banco de dados está vazio
jsonData = "./data.json"

origins = [
    "http://localhost:5173",
    "http://localhost",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
]


class Acomodacao(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    nome: str
    imagem: str
    preco_noite: float
    localizacao: str

# bd em sqlite
sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, connect_args=connect_args)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

    with Session(engine) as session:
        result = session.exec(select(Acomodacao)).first()
        if not result:
            # banco de dados vazio? popula com os dados do json
            try:
                with open(jsonData, "r", encoding="utf-8") as file:
                    dados = json.load(file)
                    acoms = [Acomodacao(**item) for item in dados]
                    session.add_all(acoms)
                    session.commit()
                    print("Banco de dados populado com dados do JSON!")
            except Exception as e:
                print(f"Erro ao carregar JSON: {e}")

def get_session():
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_session)]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()


# @app.get("/heroes/")
# def read_heroes(
#     session: SessionDep,
#     offset: int = 0,
#     limit: Annotated[int, Query(le=100)] = 100,
# ) -> list[Hero]:
#     heroes = session.exec(select(Hero).offset(offset).limit(limit)).all()
#     return heroes


@app.get("/", tags=["Raiz"], summary="Raiz", description="Raiz da API")
def read_root():
    return {"message": "Use /docs para acessar o swaggerUI da API"}

# rotas para acomodações
@app.get("/acomodacoes/", tags=["Acomodações"], summary="Lista acomodações", description="Retorna uma lista de acomodações, opcionalmente filtrando por cidade")
def read_acomodacoes(
    session: SessionDep,
    cidade: Optional[str] = Query(None, description="Filtrar por cidade")
) -> List[Acomodacao]:
    query = select(Acomodacao)
    if cidade:
        query = query.where(Acomodacao.localizacao.like(f"%{cidade}%"))
    return session.exec(query).all()

@app.get("/acomodacoes/{id}", tags=["Acomodações"], summary="Retorna uma acomodação específica", description="Retorna uma acomodação específica com base no ID fornecido")
def read_acomodacao(id: int, session: SessionDep) -> Acomodacao:
    acomodacao = session.get(Acomodacao, id)
    if not acomodacao:
        raise HTTPException(status_code=404, detail="Acomodação não encontrada")
    return acomodacao

# TODO - Implementar rota para filtrar acomodações por localização

# rotas auxiliares pro front
@app.get("/cidades/", tags=["Auxiliares"], summary="Retorna todas as cidades disponníveis")
def read_cidades(session: SessionDep) -> list[str]:
    cidades = session.exec(select(Acomodacao.localizacao)).all()
    return list(set(cidades)) 

@app.get("/estados/", tags=["Auxiliares"], summary="Retorna todos os estados disponíveis")
def read_estados(session: SessionDep) -> list[str]:
    estados = session.exec(select(Acomodacao.localizacao)).all()
    estados = [cidade.split(", ")[1] for cidade in estados]
    return list(set(estados))