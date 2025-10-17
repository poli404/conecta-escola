from fastapi import FastAPI

app = FastAPI()

# importa e inclui roteador de rotas
from routers.escola_routes import escola_router
app.include_router(escola_router)

"""@app.get("/")
def home():
    return {"mensagem": "hello, world"}"""