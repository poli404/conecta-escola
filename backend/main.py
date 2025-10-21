from fastapi import FastAPI

app = FastAPI()

# importa e inclui roteador de rotas
from routers.login_routers import login_router
from routers.escola_routes import escola_router

app.include_router(login_router)
app.include_router(escola_router)