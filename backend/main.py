from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# roteadores de rotas
from routers.login_routers import login_router
from routers.escola_routes import escola_router
from routers.professor_routes import professor_router

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