# 🚗 API Carros — CRUD em Node.js

API REST simples para cadastro de carros, construída com **Node.js**, **Express** e **MySQL/MariaDB**.

Este é um projeto de **aprendizado**: a ideia é mostrar, de forma direta e sem frameworks pesados, como montar uma API com as quatro operações básicas de um CRUD (Create, Read, Update, Delete) conectada a um banco de dados relacional.

---

## 📚 O que você aprende com este projeto

- Criar um servidor HTTP com **Express**
- Organizar o código em camadas: **rotas → controllers → services → banco**
- Receber dados via **body JSON** e via **parâmetros de rota** (`/carros/:codigo`)
- Conectar no **MySQL/MariaDB** com o pacote `mysql` e usar **queries parametrizadas** (`?`) contra SQL injection
- Transformar callbacks em **Promises** e consumir com **async/await**
- Tratar erros com `try/catch` e responder com os **status HTTP** corretos (200, 400, 404, 500)
- Usar **variáveis de ambiente** com `dotenv` para não deixar credenciais no código
- Testar a API com uma **collection do Postman** pronta

---

## 🛠️ Tecnologias

| Tecnologia | Para que serve |
|---|---|
| [Node.js](https://nodejs.org/) | Runtime JavaScript no servidor |
| [Express](https://expressjs.com/) | Framework HTTP / rotas |
| [mysql](https://www.npmjs.com/package/mysql) | Driver de conexão com MySQL/MariaDB |
| [dotenv](https://www.npmjs.com/package/dotenv) | Carrega variáveis de ambiente do arquivo `.env` |
| [cors](https://www.npmjs.com/package/cors) | Libera acesso à API a partir de outros domínios |
| [body-parser](https://www.npmjs.com/package/body-parser) | Lê o body das requisições (JSON e formulário) |
| [nodemon](https://nodemon.io/) | Reinicia o servidor automaticamente em desenvolvimento |

---

## 📁 Estrutura do projeto

```
apicarro-crud-nodejs/
├── src/
│   ├── server.js                  # Sobe o Express e registra middlewares
│   ├── routes.js                  # Define as rotas da API
│   ├── db.js                      # Conexão com o banco de dados
│   ├── controllers/
│   │   └── carroController.js     # Recebe a requisição, valida e responde
│   └── services/
│       └── CarroService.js        # Executa as queries SQL
├── database.sql                   # Script de criação do banco e da tabela
├── variaveis.env.example          # Modelo das variáveis de ambiente
├── apicarro.postman_collection.json  # Collection para testar no Postman
└── package.json
```

**Fluxo de uma requisição:**

```
Requisição HTTP → routes.js → carroController.js → CarroService.js → MySQL
                                     ↓
                              Resposta JSON
```

---

## 🚀 Como rodar

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18+
- MySQL ou MariaDB rodando localmente

### 1. Clone o repositório

```bash
git clone git@github.com:thiagolopes-dev/apicarro-crud-nodejs.git
cd apicarro-crud-nodejs
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Crie o banco de dados

```bash
mysql -u SEU_USUARIO -p < database.sql
```

Isso cria o banco `apicarros` com a tabela `carros`:

| Coluna | Tipo | Descrição |
|---|---|---|
| `codigo` | INT, auto incremento | Chave primária |
| `modelo` | VARCHAR(100) | Modelo do carro |
| `placa` | VARCHAR(10) | Placa do carro |

### 4. Configure as variáveis de ambiente

```bash
cp variaveis.env.example variaveis.env
```

Preencha o `variaveis.env` com os dados do seu banco:

```env
PORT=3000

DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=apicarros
```

> ⚠️ O `variaveis.env` está no `.gitignore` — **nunca** suba suas credenciais para o repositório.

### 5. Suba o servidor

```bash
npm start
```

Se tudo deu certo:

```
Servidor rodando em: http://localhost:3000
Conectado ao banco de dados apicarros
```

---

## 📌 Endpoints

URL base: `http://localhost:3000/api`

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/carros` | Lista todos os carros |
| `GET` | `/carros/:codigo` | Busca um carro pelo código |
| `POST` | `/carro` | Cadastra um carro |
| `PUT` | `/carro/:codigo` | Altera um carro |
| `DELETE` | `/carro/:codigo` | Exclui um carro |

Todas as respostas seguem o formato:

```json
{
  "error": "",
  "result": {}
}
```

`error` vem vazio quando dá tudo certo, e com a mensagem quando algo falha.

### Exemplos

**Cadastrar um carro**

```http
POST /api/carro
Content-Type: application/json

{
  "modelo": "Fiat Uno",
  "placa": "ABC1D23"
}
```

```json
{
  "error": "",
  "result": { "codigo": 1, "modelo": "Fiat Uno", "placa": "ABC1D23" }
}
```

**Listar todos**

```http
GET /api/carros
```

```json
{
  "error": "",
  "result": [
    { "codigo": 1, "modelo": "Fiat Uno", "placa": "ABC1D23" }
  ]
}
```

**Carro não encontrado**

```http
GET /api/carros/999
```

```json
{
  "error": "Carro não encontrado",
  "result": {}
}
```

### Status HTTP

| Status | Quando acontece |
|---|---|
| `200` | Operação realizada com sucesso |
| `400` | Campos com tipo inválido (ex.: objeto no lugar de texto) |
| `404` | Carro não encontrado |
| `500` | Erro no banco de dados |

---

## 🧪 Testando com o Postman

O repositório já vem com uma collection pronta: `apicarro.postman_collection.json`.

1. Abra o Postman e use **Import** (`Cmd + O` / `Ctrl + O`)
2. Selecione o arquivo `apicarro.postman_collection.json`
3. A collection **API Carro CRUD** aparece com todos os endpoints, incluindo os cenários de erro

A variável `baseUrl` já vem configurada como `http://localhost:3000/api`.

> 💡 Se você usar um *environment* no Postman com uma variável `baseUrl`, ela tem prioridade sobre a da collection — lembre de incluir o `/api` no final.

---

## 💡 Ideias para evoluir (exercícios)

Quer praticar? Algumas sugestões:

- [ ] Validar o formato da placa (padrão Mercosul `ABC1D23`)
- [ ] Adicionar novos campos: marca, ano, cor
- [ ] Paginação no `GET /carros`
- [ ] Trocar o pacote `mysql` pelo `mysql2` ou por um ORM (Prisma, Sequelize)
- [ ] Adicionar autenticação com JWT
- [ ] Escrever testes automatizados com Jest + Supertest
- [ ] Criar um `Dockerfile` e `docker-compose` com a API e o banco

---

## 🙏 Créditos

Projeto baseado nas aulas do [Professor Lozano](https://github.com/professorlozano).

Desenvolvido por [Thiago Lopes](https://github.com/thiagolopes-dev) para fins de estudo.
