from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import select, Session
from typing import List, Optional
from .models import Acomodacao
from .database import get_session

router = APIRouter()

@router.get("/", tags=["Raiz"], summary="Raiz", description="Raiz da API")
def read_root():
    return {"message": "Use /docs para acessar o swaggerUI da API"}

# rotas principais para acomodações
@router.get("/acomodacoes/")
def read_acomodacoes(session: Session = Depends(get_session), cidade: Optional[str] = Query(None)):
    query = select(Acomodacao)
    if cidade:
        query = query.where(Acomodacao.localizacao.like(f"%{cidade}%"))
    return session.exec(query).all()

@router.get("/acomodacoes/{id}")
def read_acomodacao(id: int, session: Session = Depends(get_session)):
    acomodacao = session.get(Acomodacao, id)
    if not acomodacao:
        raise HTTPException(status_code=404, detail="Acomodação não encontrada")
    return acomodacao

# rota auxiliar para retornar todas as cidades disponíveis e usar no autocomplete do front
@router.get("/cidades/", tags=["Auxiliares"], summary="Retorna todas as cidades disponníveis")
def read_cidades(session: Session = Depends(get_session)) -> list[str]:
    cidades = session.exec(select(Acomodacao.localizacao)).all()
    return list(set(cidades)) 