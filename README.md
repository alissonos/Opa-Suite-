# Opa Suite - Backend

## Descrição
Este é o backend do projeto **Opa Suite**, desenvolvido para gerenciar categorias, produtos e usuários. O projeto foi construído usando **Node.js** e **MongoDB** como banco de dados.

---

## Pré-requisitos
Antes de começar, certifique-se de ter os seguintes itens instalados no seu sistema:

- [Node.js](https://nodejs.org/) (versão >= 16)  
- [npm](https://www.npmjs.com/) (versão >= 8)  
- [MongoDB](https://www.mongodb.com/) configurado e em execução.  

---

## Instalação

### 1. Clonar o Repositório
Clone este repositório no seu ambiente local:  
`git clone https://github.com/seu-usuario/opa-suite-backend.git && cd opa-suite-backend`

### 2. Configurar Variáveis de Ambiente
1. Crie uma conta no [MongoDB Atlas](https://www.mongodb.com/atlas) ou configure uma instância local do MongoDB.  
2. Copie o arquivo `.env.example` e renomeie-o para `.env`:  
   `cp .env.example .env`  
3. Edite o arquivo `.env` com as configurações do MongoDB:  
   `MONGO_CS='Sua string de conexão do MongoDB Atlas'`  
   `MONGO_DB_NAME='OpaSuite'`

---

## Execução

### Modo de Desenvolvimento
Inicie o servidor no modo de desenvolvimento:  
`npm run dev`  

O servidor estará acessível em:  
`http://localhost:3500`

---

## Exemplos de Requisições

### 1. Requisições para **Usuários**
![image](https://github.com/user-attachments/assets/5c5e2a50-22f4-496d-8e72-9676032d28b2)

### 2. Requisições para **Produtos**
![image](https://github.com/user-attachments/assets/56562206-b070-4295-9af3-0a18b55dae1d)

### 3. Requisições para **Categorias**
![image](https://github.com/user-attachments/assets/07d567b4-b5f1-4488-9ade-fd543b1872b1)

---

## Estrutura do Projeto

- **backend**
  - **controllers**: Lógica dos controladores (processam requisições e respostas).
  - **dataAccess**: Acesso aos dados e operações no banco de dados.
  - **database**: Configuração da conexão com o banco de dados.
  - **helpers**: Funções auxiliares e utilitárias.
  - **node_modules**: Dependências do projeto gerenciadas pelo npm.
  - **routes**: Rotas da aplicação.

- **src**
  - **auth**
    - `auth.js`: Lógica de autenticação.
    - `index.js`: Ponto de entrada da autenticação.

- `.env`: Arquivo para variáveis de ambiente (configurações sensíveis).
- `package-lock.json`: Arquivo de bloqueio do npm para dependências.
- `package.json`: Arquivo de configuração do npm.
- `produtosData.json`: Arquivo de dados para produtos (mock ou dados fixos).

