# Conecta Escola

- Trabalho desenvolvido para a disciplina Construção de Software (9793/01), no ano letivo de 2025, ministrada pelo professor Renato Balancieri.
- Desenvolvedoras:
    - [Ana Paula L. Crippa](https://github.com/anapaulacrippa) - back-end
    - [Julia M. Sanches](https://github.com/jMarquesssss) - front-end
    - [Maria Eduarda de M. Policante](https://github.com/poli404) - front-end
    - [Pâmela C. Chalegre](https://github.com/pamelachalegre) - back-end

## Contexto
O site Conecta Escola será desenvolvido com o objetivo de auxiliar o contato entre a coordenação, os professores, os alunos e os responsáveis para que tenham total ciência sobre as notas, as faltas e o rendimento escolar de seus dependentes.

## Backend

### Tecnologias utilizadas

- FastAPI: framework para criar a API, com rotas, validações e documentação automática;
- uvicorn: servidor que executa a API FastAPI;
- sqlalchemy: ORM para mapear classes Python em tabelas MySQL;
- `pymysql`, `pydantic`, `python-dotenv`, `passlib/bcrypt`: driver para conectar Python ao MySQL, bibliotecas para validação e serialização de dados nos schemas, carregamento de variáveis de ambiente de arquivos .env e hash seguro de senhas, respectivamente.

### Execução

- Configurar banco de dados:
    - Crie um banco de dados vazio no seu `MySQL` (ex.: `conecta_escola`).
    - As tabelas serão criadas automaticamente pelo SQLAlchemy na primeira execução.

- Criar e ativar ambiente virtual:

    `python -m venv venv`

    Windows: `venv\Scripts\activate`

    Linux: `source venv/bin/activate`

- Instalar dependências:

    `pip install -r requirements.txt`

- Configurar ambiente virtual:
    - Crie um arquivo `.env` na raiz do diretório `\backend` e configure a conexão com o banco de dados e a chave secreta:
    ```bash
    DB_URL=mysql+pymysql://user:password@localhost:port/mydatabase
    ```

- Rodar servidor:

    `uvicorn main:app --reload`

## Frontend

### Tecnologias utilizadas

- Next.js: framework React para desenvolvimento frontend

### Execução

- Instalar as dependências:

    `npm install next react react-dom`

- Rodar frontend:

    `npm run dev`
