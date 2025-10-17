from fastapi import APIRouter

escola_router = APIRouter(prefix="/escola", tags=["escola"])

@escola_router.get("/")
async def escola():
    """
    Rota padrão de escolas.
    Todas as rotas das escolas precisam de autenticação.
    """
    return {"mensagem": "hello, world! :)"}