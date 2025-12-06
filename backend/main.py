from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# roteadores de rotas
from routers.login_routers import login_router
from routers.escola_routes import escola_router
from routers.professor_routes import professor_router
from routers.aluno_routes import aluno_router
from routers.responsavel_routes import responsavel_router
from routers.turma_routes import turma_router
from routers.disciplina_routes import disciplina_router
from routers.nota_routes import nota_router

# ainda nao terminei essas - assinado AP
#from routers.falta_routes import falta_router

origins = [
	"http://localhost:3000",
	"http://127.0.0.1:3000",
]

app.add_middleware(
	CORSMiddleware,
	allow_origins=origins,
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

# rotas
app.include_router(login_router)
app.include_router(escola_router)
app.include_router(professor_router)
app.include_router(aluno_router)
app.include_router(responsavel_router)
app.include_router(turma_router)
app.include_router(disciplina_router)
app.include_router(nota_router)
#app.include_router(falta_router)