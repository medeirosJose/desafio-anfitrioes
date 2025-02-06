from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import create_db_and_tables
from .routes import router

app = FastAPI()

# 5173 é a porta padrão do vite
# 3000 é a porta usada no dockerfile
origins = ["http://localhost:5173", "http://localhost", "http://127.0.0.1:5173", "http://localhost:3000", "http://localhost:3000/", "http://127.0.0.1:3000"]

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

app.include_router(router)
