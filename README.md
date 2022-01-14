# API-REST Ballebot 🏦

A [API-REST-BALLEBOT](#) disponibiliza uma API REST que permite o acesso a tabelas dos servidores, informações, configurações e arquivos privados do sistema do [BALLEBOT](#).

As dúvidas e solicitações, relacionadas ao acesso da API, como foi feita, ou dúvidas podem ser esclarecidas falando com o TAUZ via e-mail ( tauasantops@gmail.com ) ou discord ( TAUZ#4635 ).

Recursos disponíveis para acesso via API:
* [**Tabelas de Servidores**](#)
* [**Configurações de Servidores**](#)
* [**Usuários de Servidores**](#)
* [**Dados de Servidores**](#)


## Métodos
Requisições para a API devem seguir os padrões:
| Método | Descrição |
|---|---|
| `GET` | Retorna informações de um ou mais registros. |
| `POST` | Utilizado para criar um novo registro. |
| `PUT` | Atualiza dados de um registro ou altera seu valor. |
| `DELETE` | Remove um registro do sistema. |


## Respostas

| Código | Descrição |
|---|---|
| `200` | Ok, requisição foi executada e foi devolvido um json como resposta|
| `201` | Requisição executada com sucesso e o item criado, atualizado ou removido (success).|
| `400` | Erros de validação ou os campos informados não existem no sistema.|
| `401` | Não autorizado.|
| `404` | Registro pesquisado ou requisitado não encontrado (Not found).|
| `409` | A uma sintaxe errada na requisição ou ouve um conflito.|
| `429` | Número máximo de requisições atingido. (*aguarde alguns segundos e tente novamente*)|


## Limites (Throttling)
Existe o limite de `60` requisições por minuto por aplicação+usuário.

Você pode acompanhar esses limites nos `headers`: `X-RateLimit-Limit`, `X-RateLimit-Remaining` enviados em todas as respostas da API.

Por questões de segurança, todas as requisições devem ser feitas através do protocolo `HTTPS`.


# Group Autenticação - OAuth

Nossa API utiliza [OAuth2](https://oauth.net/2/) como forma de autenticação/autorização.

<img src="https://imgur.com/6k1GM5b.png" width="600">

Para utilizar a Api através do OAuth2, você precisará:
1. Ter um login na api ( pessoas autorizadas para acessar a API pelo OWNER ).
2. Envia um usuário e uma password via body ( {"user":"username", "password":"senha"} ).
3. Receber um token e usá-lo no header da requisição  ( Bearer token ).
4. **Todas as requisições devem usar seu token como assinatura e autenticação**.
---

## Autorizando sua requisição
Monte a requisição utilizando o token fornecido pela rota **/oauth** para acessar tabelas de outras rotas

+ Request (application/json) 
> via biblioteca **axios**

```js
import axios from 'axios';
const url = 'https://localhost:443/table/nameTable'; //Sua URL
const token = ''; //Seu Token

axios.get({
  url,
  headers: { Authorization: `Bearer ${token}` }
})
```

  > via biblioteca **request**
```js
import request from "request"
const url = "https://localhost:443/table/nameTable"; //Sua URL
const token = '' //Seu Token
request({
  url,
  method: 'get',
  headers: { 
    'Authorization': `Bearer ${token}`
  }
});
```

# Estrutura de Rotas das Tabelas

| Rotas Públicas | Método | Descrição |
|---|---|---|
| `_base/table/:nomeDaTabela` | GET | Pegar todo o conteúdo de uma tabela, será devolvido um json como resposta. 
| `_base/table/:nomeDaTabela/:idItem` | GET | Pegar item de uma tabela via ID, será devolvido um json como resposta.
| `_base/table/:nomeDaTabela` | POST | Adicionar item em uma tebela, deve ser passado na estrutura que está na aba [Banco de dados](#banco-de-dados) ({id: " ", data: " "}). |
| `_base/table/:nomeDaTabela/` | PUT | Atualizar um item, deve ser passado a mesma estrutura que é usada acima, veja na Aba [Banco de dados](#banco-de-dados) ({id: " ", data: " "}).|
| `_base/table/:nomeDaTabela/:idItem` | DELETE | Deletar um item.|
| `_base/createTable/:nomeDaTabela` | POST | Criar uma tabela no banco (Veja como funciona uma tabela no banco na aba [Banco de dados](#banco-de-dados) ).|
| `_base/deleteTable/:nomeDaTabela` | DELETE | Deletar uma tabela no banco.|


| Rotas Privadas | Método | Descrição |
|---|---|---|
| `_base/createUser` | POST | Deve ser passado um json com um objeto possuindo a estrutura: ({user:"", password: "", role: ""}). O usuário terá acesso a api de acordo com a role fornecida. |
| `_base/deleteUser/:user` | DELETE | Remover o acesso de um usuário  |


# Banco de Dados

O banco de dados da API utiliza SQLite como base e armazenamento (ou seja, um sistema NoSQL), a estrutura do banco possui duas colunas, sendo elas:

**ID** >> Esse será o campo identificador da linha no banco

**DATA** >>O Data receberá um json para armazenar as informações

Veja o exemplo:

| ID | DATA |
|---|---|
| user_id_0000000000000001 | { username: "João", descriminator: "3244", idade: 19, skills: ["java","python","kotlin","javascript"]}|
| user_id_0000000000000002 | { username: "Maria", descriminator: "9162", idade: 18, skills: ["php","golang","elixir","rust"]}|

Quando for necessário gravar alguma informação ou novo item no banco, deve ser passado um json na requisição post da seguinte maneira:

//Ex.1
```json
{
  "id": "user_id_0000000000000001",
  "data": {
    "sername": "Maria",
    "descriminator": "9162",
    "idade": 18,
    "skills": ["php", "golang", "elixir", "rust"]
  }
}
```
//Ex.2
```json
{
  "id": "joao",
  "data": "programador"
}
```

# Rotas Especificadas e como executá-las

## Criar uma Tabela

Utilize a rota ``_base/createTable/:nomeDaTabela`` para criar uma nova tabela com o método **POST**, o nome passado será o nome da tabela que será criada com as mesma colunas e estruturas de todas as tabelas (citadas na aba [Banco de dados](#banco-de-dados) ). É necessário apenas passa o nome da tabela como parâmetro na url.

```js
//Ex
//_base/createTable/skills output: 201 - success create
//_base/createTable/github output: 201 - sucess create
//_base/createTable/users output: 201 - succes create
```

## Deletar uma Tabela

Utilize a rota ``_base/deleteTable/:nomeDaTabela`` para remover uma tabela do banco com o método **DELETE**, essa tabela será apagada para sempre. É necessário apenas passa o nome da tabela como parâmetro na url. 

```js
//Ex
//_base/deleteTable/skills output: 201 - sucess delete
//_base/deleteTable/github output: 201 - sucess delete
//_base/deleteTable/users output: 201 - sucess delete
```

## Pegar uma Tabela

Utilize a rota ``_base/table/:nomeDaTabela`` para receber um json com toda a tabela que foi passada como parâmetro, utilizando o método **GET**.

//_base/table/skills
//Ex.output
```json
[
  {
  "id" : "java",
  "data": {
    "nivel":"senior"
    }
  },
  {
  "id" : "linguagens",
  "data": ["php", "golang", "elixir", "rust"]
  }
]
```

## Adicionar um item em uma Tabela

Utilize a rota  `_base/table/:nomeDaTabela` para selecionar a tabela que será adicionado o item e envie um método **POST**. Seguindo a estrutura do banco, envie um json no body da requisição com todo o objeto que você quer armazenar no DATA do objeto e um nome chave para quando precisar no ID, veja o exemplo:

//Ex.1
```json
body: {
  "id": "guild_id_00001",
  "data": {
    "name" : "ballerini",
    "countMembers": "27000",
    "local": "BR",
    "timestamp": 1642128013
  }
}
```
//Ex.2
```json
body: {
  "id": "guild_id_00001",
  "data": "disabled"
}
```

## Atualizar um item em uma Tabela

Utilize a rota `_base/table/:nomeDaTabela` para atualizar o item passado como parâmetro, deve ser passado um body igual é passado no post, mas o método deverá ser o **PUT**. O item será atualizado se existir na tabela.

//Ex.1
```json
body: {
  "id": "guild_id_00001",
  "data": {
    "name" : "ballerini 123",
    "countMembers": "30000",
    "local": "BR",
    "timestamp": 1642936222
  }
}
```
//Ex.2
```json
body: {
  "id": "guild_id_00001",
  "data": "active"
}
```

## Deletar um item em uma Tabela

Utilize a rota  `_base/table/:nomeDaTabela/:idItem` para deletar um item passando ele como parâmetro depois de especificar a tabela no qual ele pertence, o método usado é o **DELETE**. O item será apagado para sempre. 

```js
//_base/table/skills/java  //o item java será apagado da tabela skills
//_base/table/servers/ballerini //o item ballerini será apagado da tabela servers
```

## Pegar um item em uma Tabela

Utilize a rota `_base/table/:nomeDaTabela/:idItem` para pegar um item de dentro de uma tabela, o método usado é o **GET**. Será devolvido um json com o ID e o DATA.

```json
{
  "id": "fui passado no parâmetro da url",
  "data": {
    "message": "objeto que você procura",
    "value": 8001
  }
}
```

