from sqlmodel import SQLModel, Field

class Acomodacao(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    nome: str
    imagem: str
    preco_noite: float
    localizacao: str