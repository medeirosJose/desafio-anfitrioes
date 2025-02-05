# Desafio Anfitriões de Aluguel - Um Breve <i>readme</i>

Conforme descrito na proposta do desafio, este projeto é composto por um **backend** (Python -FastAPI) e um **frontend** (Vite + React), ambos containerizados via Docker. Trata-se de um sistema fullstack simplificado: Uma API responsável por fornecer os dados de imóveis e um frontend que consome esses dados, exibindo-os. 

Esse proposta de software foi produzida por mim, [José Eduardo Medeiros Jochem](https://www.linkedin.com/in/medeirosjose/), como parte do processo seletivo para a vaga de Desenvolvedor Fullstack na Anfitriões de Aluguel!
## 🏗 **Estrutura do Projeto**
```
/desafio-anfitrioes
│── /backend       # FastAPI
│── /frontend      # React + Vite
│── docker-compose.yml  # Orquestra os serviços
│── README.md      
```

## 📋 **Pré-requisitos**

Antes de iniciar, é necessário ter instaladoo:
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

Verifique as versões com:
```sh
docker -v
docker-compose -v
```


## 🔧 **Instalação e Execução**


### 1. **Buildar e Iniciar os containers**
```sh
docker-compose up --build
```
Isso fará o build das imagens e iniciará os serviços do **backend** e **frontend**.

> As instruções rodadas pelo Docker Compose estão definidas no arquivo `docker-compose.yml`. Essencialmente ele está coordenando a execução das dockerfiles do backend e do frontend.


## 📌 **Acesso aos serviços**

- **Frontend (React + Vite):** [http://localhost:3000](http://localhost:3000)
- **Backend (FastAPI - Swagger UI):** [http://localhost:8000/docs](http://localhost:8000/docs)


## Dúvidas e Feedback
Fico disponível para qualquer dúvida e agradeço (muito!) feedbacks! 


