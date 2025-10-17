# Conecta Escola

Trabalho desenvolvido para a disciplina Construção de Software (9793/01), no ano letivo de 2025, ministrada pelo professor Renato Balancieri.

## Contexto

## Tecnologias utilizadas

- fastapi: framework para criar a API, com rotas, validações e documentação automática
- uvicorn: servidor que executa a API FastAPI
- sqlalchemy: ORM para mapear classes Python em tabelas MySQL
- pymysql: driver para conectar Python ao MySQL
- pydantic: validação e serialização de dados nos schemas
- python-dotenv: carregamento de variáveis de ambiente de arquivos .env
- passlib/bcrypt: hash seguro de senhas

## Execução

- Criar e ativar ambiente virtual

`python -m venv venv`

windows:
venv\Scripts\activate

linux:
source venv/bin/activate

- Instalar dependências

pip install -r requirements.txt

- Rodar servidor

uvicorn main:app --reload