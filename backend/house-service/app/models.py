from sqlmodel import SQLModel, Field

class Acomodacao(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    image: str
    price_night: float
    location: str