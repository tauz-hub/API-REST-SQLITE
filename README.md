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
| `201` | Requisição executada com successo e o item criado (success).|
| `400` | Erros de validação ou os campos informados não existem no sistema.|
| `401` | Não autorizado.|
| `404` | Registro pesquisado não encontrado (Not found).|
| `409` | A uma sintaxe errada na requisição ou ouve um conflito.|
| `429` | Número máximo de requisições atingido. (*aguarde alguns segundos e tente novamente*)|


## Limites (Throttling)
Existe o limite de `60` requisições por minuto por aplicação+usuário.

Você pode acompanhar esses limites nos `headers`: `X-RateLimit-Limit`, `X-RateLimit-Remaining` enviados em todas as respostas da API.

Ações de `listar` exibem `50` registros por página. Não é possível alterar este número.

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

## Autorizando sua requisição [GET]
Monte a requisição utilizando o token fornecido pela rota **/oauth** para acessar tabelas

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
## Estrutura de Rotas das Tabelas

+ **/table/:nameDaTabela**
  


### Autorizando sua requisição [POST]


+ Request (application/json)

    + Body

            {
                "code": "1rbUURjcp1KErn7Jgx7d",
                "client_id": "e70654d7f568d0",
                "client_secret": "156762a28c007a64ff",
                "redirect_uri": "urn:ietf:wg:oauth:2.0:oob:auto",
                "grant_type": "authorization_code"
            }

+ Response 200 (application/json)

    + Body

            {
                "access_token": "[access_token]",
                "token_type": "Bearer",
                "expires_in": 900,
                "refresh_token": "[refresh_token]",
                "personal_token": "[token_string]"
            }


### Utilizando refresh_token [POST]

Utilize o último `refresh_token` recebido para solicitar um novo `access_token`. Após utilizado o `refresh_token`, este será invalidado e um novo será fornecido em conjunto com o `access_token`.

#### Dados para envio no POST
| Parâmetro | Descrição |
|---|---|
| `grant_type` | Informar: `refresh_token` |
| `client_id` | Código de identificação da aplicação no sistema. |
| `client_secret` | `client_secret` da aplicação no sistema. |
| `redirect_uri` | Url de redirecionamento informada na configuração da aplicação. |
| `refresh_token` | Último refresh_token recebido. |


+ Request (application/json)

    + Body

            {
                "refresh_token": "qkUb1vx8yBmySV6dq7mPR",
                "client_id": "4Lbr9ubFDFPo8pz1Z",
                "client_secret": "4Lbr9ubFDFPo",
                "redirect_uri": "urn:ietf:wg:oauth:2.0:oob",
                "grant_type": "refresh_token"
            }

+ Response 200 (application/json)

    + Body

            {
                "access_token": "[access_token]",
                "token_type": "Bearer",
                "expires_in": 900,
                "refresh_token": "[refresh_token]"
            }

### Utilizando personal_token [POST]

O `personal_token` é do formato JWT e contém informações da aplicação e do cliente (usuário). Este é o tipo de token recomendado para utilização em sistemas de e-Commerce e sites integrados ao eGestor.

Os dados desse token podem ser obtidos diretamente no eGestor, na aba `Configurações -> Aplicativos conectados`.

#### Dados para envio no POST
| Parâmetro | Descrição |
|---|---|
| `grant_type` | Informar: `personal` |
| `personal_token` | Token JWT com informações da aplicação cliente. |


+ Request (application/json)

    + Body

            {
              "grant_type": "personal"
              "personal_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHAiOiIzNDhlNTM4MzQ2M2Y3MzZjMGExZTJhNTFmNjYwZjA5NCIsInN1YmRvbWluaW8iOiJleGVtcGxvIiwiY2xpZW50IjoiMTU0ZDZlZGQ4YmQzMDEwYzQ4NjBkN2E5Yzk1NzNmYmVmZTUyNGRlZiJ9.JJNs0bFtGOtwyJy_r-eefsvkd387M_x7zpucE1m4WIw",
            }

+ Response 200 (application/json)

    + Body

            {
                "access_token": "[access_token]",
                "token_type": "Bearer",
                "expires_in": 900,
                "refresh_token": "[refresh_token]"
            }


# Group Recursos


# Contatos [/contatos]

Os contatos podem ser clientes, fornecedores e transportadoras.


### Listar (List) [GET]

+ Request (application/json)

    + Headers

            Authorization: Bearer [access_token]

+ Response 200 (application/json)

          {
              "total": 1,
              "per_page": 50,
              "current_page": 1,
              "last_page": 4,
              "next_page_url": null,
              "prev_page_url": null,
              "from": 1,
              "to": 50,
              "data": [
                {
                  "codigo": "1",
                  "tipo": ["cliente", "fornecedor"],
                  "nome": "Nome do contato",
                  "emails": [],
                  "fones": [],
                  "tags": [],
                  "cidade": "Nome da cidade",
                  "uf": "UF"
                }
              ]
          }

+ Response 401 (application/json)

          {
              "errCode": 401,
              "errMsg": "Não foi possível acessar o sistema. Verifique seu \"access_token\".",
              "errObs": "access_denied",
              "errFields": null,
              "errUrl": "/v1/contatos"
          }

### Novo (Create) [POST]

+ Attributes (object)

    + nome: nome do contato (string, required) - limite 60 caracteres
    + fantasia (string, optional) - limite de 60 caracteres
    + tipo (array, required) - Tipo
        + cliente
        + fornecedor
        + transportadora
    + nomeParaContato (string, optional) - limite de 60 caracteres
    + cpfcnpj (string, optional)
    + dtNasc (string, optional) - formato: YYYY-MM-DD
    + emails (array)
    + fones (array)
    + cep (number, optional)
    + logradouro (string, optional)
    + numero (string, optional)
    + complemento (string, optional)
    + bairro (string, optional)
    + cidade (string, optional)
    + codIBGE (string, optional)
    + uf (string, optional)
    + pais (string, optional)
    + clienteFinal (optional)
    + indicadorIE (enum[number], optional)
        + Members
          + 1 - Contribuinte
          + 2 - Isento de IE
          + 9 - Não contribuinte
    + inscricaoMunicipal (string, optional)
    + inscricaoEstadual (string, optional)
    + inscricaoEstadualST (string, optional)
    + suframa (string, optional)
    + obs (string, optional)
    + tags (array, optional)

+ Request (application/json)

    + Headers

            Authorization: Bearer [access_token]

    + Body

            {
              "codigo": 324,
              "nome": "Kaya Labadie",
              "fantasia": "",
              "nomeParaContato": "Elfrieda Labadie",
              "cpfcnpj": "83294489654",
              "tipo": [
                "cliente"
              ],
              "dtNasc": "1992-02-13",
              "emails": [
                "exemplo@example.com.br"
              ],
              "fones": [],
              "cep": 4320040,
              "logradouro": "Rua Exemplo lado ímpar",
              "numero": "999",
              "complemento": "",
              "bairro": "",
              "codIBGE": "355030",
              "uf": "SP",
              "pais": "",
              "clienteFinal": true,
              "indicadorIE": 1,
              "inscricaoMunicipal": "",
              "inscricaoEstadual": "",
              "inscricaoEstadualST": "",
              "suframa": "",
              "obs": "",
              "tags": []
            }

+ Response 200 (application/json)

    + Headers

            X-RateLimit-Limit: 60
            X-RateLimit-Remaining: 59

    + Body

            {
                "codigo": 1,
                "nome": "Nome do contato"
            }

### Detalhar (Read) [GET /contatos/{codigo}]

+ Parameters
    + codigo (required, number, `1`) ... Código do contato

+ Request (application/json)

    + Headers

            Authorization: Bearer [access_token]

+ Response 200 (application/json)
  Todos os dados do contato
    + Headers

            X-RateLimit-Limit: 60
            X-RateLimit-Remaining: 58

    + Body

            {
              "codigo": "1",
              "tipo": ["cliente", "fornecedor", "transportadora"],
              "nome": "Nome do novo contato",
              "fantasia": "",
              "nomeContato": "",
              "cpfcnpj": "",
              "clienteFinal": true,
              "indicadorIE": 9,
              "inscricaoEstadual": "",
              "inscricaoEstadualST": "",
              "inscricaoMunicipal": "",
              "suframa": "",
              "emails": [],
              "logradouro": "",
              "numero": "",
              "complemento": "",
              "bairro": "",
              "cidade": "",
              "codIBGE": "",
              "uf": "",
              "cep": "",
              "pais": "",
              "fones": [],
              "tags": [],
              "obs": "",
              "dtNasc": "1990-05-12",
              "dtCad": "2017-01-15 11:20:15"
            }

+ Response 404 (application/json)
  Quando registro não for encontrado.
    + Headers

            X-RateLimit-Limit: 60
            X-RateLimit-Remaining: 59

    + Body

            {
              "errCode": 404,
              "errMsg": "Nenhum registro com código 1 econtrado",
              "errObs": null,
              "errFields": null
            }

+ Response 410 (application/json)
  Quando registro foi apagado do sistema, o código de retorno é 410.
    + Headers

            X-RateLimit-Limit: 60
            X-RateLimit-Remaining: 59
    + Body

            {
              "errCode": 410,
              "errMsg": "Registro com código 1 não existe.",
              "errObs": null,
              "errFields": null
            }

### Editar (Update) [PUT  /contatos/{codigo}]

+ Request (application/json)

    + Headers

            Authorization: Bearer [access_token]

    + Body

            {
              "nome": "Exemplo Company LTDA",
              "fantasia": "",
              "nomeParaContato": "Elfrieda",
              "cpfcnpj": "83294489654",
              "tipo": [
                "cliente"
              ],
              "dtNasc": "1992-02-13",
              "emails": [
                "exemplo@example.com.br"
              ],
              "fones": [],
              "cep": 4320040,
              "logradouro": "Rua Exemplo lado ímpar",
              "numero": "999",
              "complemento": "",
              "bairro": "",
              "codIBGE": "355030",
              "uf": "SP",
              "pais": "",
              "clienteFinal": true,
              "indicadorIE": 1,
              "inscricaoMunicipal": "",
              "inscricaoEstadual": "",
              "inscricaoEstadualST": "",
              "suframa": "",
              "obs": "",
              "tags": []
            }

+ Response 200 (application/json)
  Todos os dados do contato
    + Headers

            X-RateLimit-Limit: 60
            X-RateLimit-Remaining: 58

    + Body

            {
              "codigo": "1",
              "tipo": ["cliente", "fornecedor", "transportadora"],
              "nome": "Nome do novo contato",
              "fantasia": "",
              "nomeContato": "",
              "cpfcnpj": "",
              "clienteFinal": true,
              "indicadorIE": 9,
              "inscricaoEstadual": "",
              "inscricaoEstadualST": "",
              "inscricaoMunicipal": "",
              "suframa": "",
              "emails": [],
              "logradouro": "",
              "numero": "",
              "complemento": "",
              "bairro": "",
              "cidade": "",
              "codIBGE": "",
              "uf": "",
              "cep": "",
              "pais": "",
              "fones": [],
              "tags": [],
              "obs": "",
              "dtNasc": "1990-05-12",
              "dtCad": "2017-01-15 11:20:15"
            }

### Remover (Delete) [DELETE  /contatos/{codigo}]

+ Request (application/json)

    + Headers

            Authorization: Bearer [access_token]

+ Response 200 (application/json)

    + Headers

            X-RateLimit-Limit: 60
            X-RateLimit-Remaining: 59

    + Body

            {
                "code": "200",
                "msg": "Contato com código 317 excluído com successo!",
                "obs": null,
                "fields": null
            }

# Produtos [/produtos]

Produtos são utilizados nas vendas e controle de estoque.


### Listar (List) [GET]

+ Request (application/json)

  + Headers

            Authorization: Bearer [access_token]

+ Response 200 (application/json)

            {
                "total": 1,
                "per_page": 50,
                "current_page": 1,
                "last_page": 4,
                "next_page_url": null,
                "prev_page_url": null,
                "from": 1,
                "to": 50,
                "data": [
                  {
                      "codigo": 1,
                      "descricao": "Caneca Preta",
                      "codigoProprio": "",
                      "estoque": 60,
                      "estoqueMinimo": 10,
                      "controlarEstoque": false,
                      "margemLucro": 0,
                      "precoCusto": 100,
                      "precoVenda": 200,
                      "origemFiscal": 0,
                      "unidadeTributada": "UN",
                      "refEanGtin": "",
                      "ncm": "",
                      "excecaoIPI": 1,
                      "codigoCEST": "",
                      "pesoBruto": 0,
                      "pesoLiquido": 0,
                      "codigoGrupoTributos": 1,
                      "anotacoesNFE": "",
                      "anotacoesInternas": "",
                      "tags": [ 'café', 'utilidades' ],
                      "dtCad": "2017-03-10 14:10:37"
                  }
                ]
            }

### Novo (Create) [POST]

+ Request (application/json)

    + Headers

            Authorization: Bearer [access_token]

    + Body

                {
                  "descricao": "Novo produto",
                  "codigoProprio": "001",
                  "estoque": 100,
                  "estoqueMinimo": 0,
                  "controlarEstoque": true,
                  "margemLucro": 0.00,
                  "precoCusto": 5.00,
                  "precoVenda": 10.37,
                  "origemFiscal": 0,
                  "unidadeTributada": "UN",
                  "refEanGtin": "",
                  "ncm": "",
                  "codigoCEST": "0107400",
                  "excecaoIPI": 7,
                  "codigoGrupoTributos": 0,
                  "anotacoesNFE": "",
                  "anotacoesInternas": "",
                  "pesoBruto": 0,
                  "pesoLiquido": 0,
                  "tags": ['examplo', 'modelo']
                }

+ Response 200 (application/json)

    + Headers

            X-RateLimit-Limit: 60
            X-RateLimit-Remaining: 59

    + Body

            {
                "codigo": 1,
                "descricao": "Novo produto"
            }

### Detalhar (Read) [GET /produtos/{codigo}]

+ Request (application/json)

  + Headers

            Authorization: Bearer [access_token]

  + Parameters
      + codigo (required, number, `1`) ... Código do contato

+ Response 200 (application/json)

    + Headers

            X-RateLimit-Limit: 60
            X-RateLimit-Remaining: 58

    + Body

            {
              "codigo": "1",
              "descricao": "Novo produto",
              "codigoProprio": "",
              "estoque": 100,
              "estoqueMinimo": 0,
              "controlarEstoque": true,
              "margemLucro": 0.00,
              "precoCusto": 0.0000,
              "precoVenda": 0.0000,
              "origemFiscal": 0,
              "unidadeTributada": "UN",
              "refEanGtin": "",
              "ncm": "",
              "codigoCEST": "",
              "excecaoIPI": "",
              "codigoGrupoTributos": 0,
              "anotacoesNFE": "",
              "anotacoesInternas": "",
              "pesoBruto": "0.000",
              "pesoLiquido": "0.000",
              "tags": [],
              "dtCad": "2017-05-24 17:32:18"
            }

+ Response 410 (application/json)
 Quando o registro foi apagado do sistema.

    + Body

            {
              "errCode": 410,
              "errMsg": "Registro com código 1 não existe.",
              "errObs": null,
              "errFields": null
            }

+ Response 404 (application/json)
 Quando o registro não foi encontrado.

    + Body

            {
              "errCode": 404,
              "errMsg": "Nenhum registro com código 1 econtrado",
              "errObs": null,
              "errFields": null
            }

### Editar (Update) [PUT /produtos/{codigo}]

+ Request (application/json)

  + Headers

            Authorization: Bearer [access_token]

  + Parameters
      + codigo (required, number, `1`) ... Código do contato

+ Response 200 (application/json)

    + Headers

            X-RateLimit-Limit: 60
            X-RateLimit-Remaining: 58

    + Body

            {
              "descricao": "Novo produto",
              "codigoProprio": "",
              "estoque": 100,
              "estoqueMinimo": 0,
              "controlarEstoque": true,
              "margemLucro": 0.00,
              "precoCusto": 0.0000,
              "precoVenda": 0.0000,
              "origemFiscal": 0,
              "unidadeTributada": "UN",
              "refEanGtin": "",
              "ncm": "",
              "codigoCEST": "",
              "excecaoIPI": "",
              "codigoGrupoTributos": 0,
              "anotacoesNFE": "",
              "anotacoesInternas": "",
              "pesoBruto": "0.000",
              "pesoLiquido": "0.000",
              "tags": []
            }

+ Response 410 (application/json)
 Quando o registro foi apagado do sistema.

    + Body

            {
              "errCode": 410,
              "errMsg": "Registro com código 1 não existe.",
              "errObs": null,
              "errFields": null
            }

+ Response 404 (application/json)
 Quando registro não foi encontrado.

    + Body

            {
              "errCode": 404,
              "errMsg": "Nenhum registro com código 1 econtrado",
              "errObs": null,
              "errFields": null
            }

### Remover (Delete) [DELETE  /produtos/{codigo}]

+ Request (application/json)

    + Headers

            Authorization: Bearer [access_token]

+ Response 200 (application/json)

    + Headers

            X-RateLimit-Limit: 60
            X-RateLimit-Remaining: 59

    + Body

            {
              "code": "200",
              "msg": "Produto com código 1 excluído com successo.",
              "obs": null,
              "fields": null
            }

# Serviços [/servicos]


### Listar (List) [GET]

+ Request (application/json)

  + Headers

            Authorization: Bearer [access_token]

+ Response 200 (application/json)

            {
                "total": 1,
                "per_page": 50,
                "current_page": 1,
                "last_page": 1,
                "next_page_url": null,
                "prev_page_url": null,
                "from": 1,
                "to": 50,
                "data": [
                    {
                        "codigo": 3,
                        "descricao": "",
                        "precoVenda": 0,
                        "codigoGrupoTributos": 0,
                        "tags": [],
                        "dtCad": "2017-04-24 11:44:35",
                        "itemListaServico": ""
                    }
                ]
            }

### Novo (Create) [POST]

+ Request (application/json)

    + Headers

            Authorization: Bearer [access_token]

    + Body

            {
              "descricao": "Manuteção agendada",
              "precoVenda": 10,
              "codigoGrupoTributos": 0,
              "dtCad": "2017-04-24 11:44:35",
              "tags": [],
              "itemListaServico": ""
            }

+ Response 200 (application/json)

    + Headers

            X-RateLimit-Limit: 60
            X-RateLimit-Remaining: 59

    + Body



### Detalhar (Read) [GET /servicos/{codigo}]

+ Request (application/json)

  + Headers

            Authorization: Bearer [access_token]

  + Parameters
      + codigo (required, number, `1`) ... Código do contato

+ Response 200 (application/json)

    + Headers

            X-RateLimit-Limit: 60
            X-RateLimit-Remaining: 58

    + Body

            {
              "descricao": "Manuteção agendada",
              "precoVenda": 10,
              "codigoGrupoTributos": 0,
              "dtCad": "2017-04-24 11:44:35",
              "tags": [],
              "itemListaServico": ""
            }

+ Response 410 (application/json)
 Quando o registro foi apagado do sistema.

    + Body

            {
              "errCode": 410,
              "errMsg": "Registro com código 1 não existe.",
              "errObs": null,
              "errFields": null
            }

+ Response 404 (application/json)
 Quando o registro não foi encontrado.

    + Body

            {
              "errCode": 404,
              "errMsg": "Nenhum registro com código 1 econtrado",
              "errObs": null,
              "errFields": null
            }

### Editar (Update) [PUT /servicos/{codigo}]

+ Request (application/json)

  + Headers

            Authorization: Bearer [access_token]

  + Parameters
      + codigo (required, number, `1`) ... Código do contato

+ Response 200 (application/json)

    + Headers

            X-RateLimit-Limit: 60
            X-RateLimit-Remaining: 58

    + Body

            {
              "codigo": 434,
              "descricao": "Manutenção"
            }

+ Response 410 (application/json)
 Quando o registro foi apagado do sistema.

    + Body

            {
              "errCode": 410,
              "errMsg": "Registro com código 1 não existe.",
              "errObs": null,
              "errFields": null
            }

+ Response 404 (application/json)
 Quando o registro não foi encontrado.

    + Body

            {
              "errCode": 404,
              "errMsg": "Nenhum registro com código 1 econtrado",
              "errObs": null,
              "errFields": null
            }

### Remover (Delete) [DELETE  /servicos/{codigo}]

+ Request (application/json)

    + Headers

            Authorization: Bearer [access_token]

+ Response 200 (application/json)

    + Headers

            X-RateLimit-Limit: 60
            X-RateLimit-Remaining: 59

    + Body

            {
              "code": "200",
              "msg": "Serviço com código 1 excluído com successo.",
              "obs": null,
              "fields": null
            }


# Vendas [/vendas]

As vendas não podem ser editadas. Caso seja necessário, apague-a e crie uma nova.

### Listar (List) [GET]

+ Request (application/json)

    + Headers

            Authorization: Bearer [access_token]

+ Response 200 (application/json)

          {
              "total": 1,
              "per_page": 50,
              "current_page": 1,
              "last_page": 4,
              "next_page_url": null,
              "prev_page_url": null,
              "from": 1,
              "to": 50,
              "data": [
                {
                    "codigo": 4,
                    "codContato": 7,
                    "nomeContato": "Cliente",
                    "codVendedor": 1,
                    "dtVenda": "2017-04-01",
                    "dtEntrega": "2017-04-10",
                    "valorTotal": 500,
                    "valorFinanc": 500,
                    "codsNFe": [],
                    "situacao": 50,
                    "tags": []
                }
              ]
          }

+ Response 401 (application/json)

          {
              "errCode": 401,
              "errMsg": "Não foi possível acessar o sistema. Verifique seu \"access_token\".",
              "errObs": "access_denied",
              "errFields": null,
              "errUrl": "/v1/vendas"
          }

### Novo (Create) [POST]

+ Request (application/json)

    + Headers

            Authorization: Bearer [access_token]

    + Body

            {
              "dtVenda":"2017-07-18",
              "codVendedor":1,
              "tags": [],
              "customizado": {
                "xCampo1": "Observações gerais"
              },
              "produtos": [
                {
                "codProduto":17,
                "quant":1,
                "vDesc":0,
                "preco":3438,
                "obs":""
                }
              ],
              "financeiros": [
                { "dtVenc":"2017-05-18" }
              ]
            }

+ Response 200 (application/json)

    + Headers

            X-RateLimit-Limit: 60
            X-RateLimit-Remaining: 59

    + Body

            {
                "codigo": 1,
                "nome": "Nome do contato"
            }

### Detalhar (Read) [GET /vendas/{codigo}]

+ Parameters
    + codigo (required, number, `1`) ... Código da venda

+ Request (application/json)

    + Headers

            Authorization: Bearer [access_token]

+ Response 200 (application/json)
  Todos os dados do contato
    + Headers

            X-RateLimit-Limit: 60
            X-RateLimit-Remaining: 58

    + Body

            {
              "codigo": 1,
              "codContato": 1,
              "nomeContato": "Marcelo",
              "codVendedor": 2,
              "nomeVendedor": "João",
              "dtVenda": "2017-07-11",
              "dtEntrega": "2017-07-12",
              "dtCad": "2017-06-11 14:15:20",
              "valorTotal": 500,
              "valorFinanc": 500,
              "valorEntrada": 0,
              "numParcelas": 0,
              "codsNFe": [],
              "customizado": {
                "xCampo1": "Venda direta."
              },
              "clienteFinal": true,
              "situacao": 50,
              "tags": [],
              "produtos": [
                {
                    "codigo": 26,
                    "codProduto": 17,
                    "tipoProd": "produto",
                    "preco": 0,
                    "custo": 110,
                    "custoCadProd": 110,
                    "quant": 1,
                    "vDesc": 0,
                    "valorIPI": 0,
                    "valorST": 0,
                    "obs": "",
                    "descricao": "Caneca preta",
                    "codigoProprio": "204"
                },
                {
                    "codigo": 267,
                    "codProduto": 17,
                    "tipoProd": "produto",
                    "preco": 500,
                    "custo": 110,
                    "custoCadProd": 110,
                    "quant": 1,
                    "vDesc": 0,
                    "valorIPI": 5,
                    "valorST": 0,
                    "obs": "",
                    "descricao": "Caneca preta",
                    "codigoProprio": "204"
                }
              ],
              "financeiros": [
                {
                    "codigo": 337,
                    "codFormaPgto": 0,
                    "codCaixa": 1,
                    "codRecibo": 0,
                    "situacao": 20,
                    "dtComp": "2017-07-11",
                    "dtVenc": "2017-07-11",
                    "valor": 505
                }
              ]
            }

+ Response 404 (application/json)
  Quando o registro não foi encontrado.
    + Headers

            X-RateLimit-Limit: 60
            X-RateLimit-Remaining: 59

    + Body

            {
              "errCode": 404,
              "errMsg": "Nenhum registro com código 1 econtrado",
              "errObs": null,
              "errFields": null
            }

+ Response 410 (application/json)
  Quando o registro foi apagado do sistema.
    + Headers

            X-RateLimit-Limit: 60
            X-RateLimit-Remaining: 59
    + Body

            {
              "errCode": 410,
              "errMsg": "Registro com código 1 não existe.",
              "errObs": null,
              "errFields": null
            }


### Remover (Delete) [DELETE  /vendas/{codigo}]

+ Request (application/json)

    + Headers

            Authorization: Bearer [access_token]

+ Response 200 (application/json)

    + Headers

            X-RateLimit-Limit: 60
            X-RateLimit-Remaining: 59

    + Body

            {
                "code": "200",
                "msg": "Venda com código 317 excluída com successo!",
                "obs": null,
                "fields": null
            }


### Detalhar contato da venda [GET  /vendas/{codigo}/contato]

+ Request (application/json)

    + Headers

            Authorization: Bearer [access_token]

+ Response 200 (application/json)

    + Headers

            X-RateLimit-Limit: 60
            X-RateLimit-Remaining: 59

    + Body

            {
              "codigo": 324,
              "nome": "Kaya Labadie",
              "fantasia": "",
              "nomeParaContato": "Elfrieda Labadie",
              "cpfcnpj": "83294489654",
              "tipo": [
                "cliente"
              ],
              "dtNasc": "1992-02-13",
              "emails": [
                "exemplo@example.com.br"
              ],
              "fones": [],
              "cep": 4320040,
              "logradouro": "Rua Exemplo lado ímpar",
              "numero": "999",
              "complemento": "",
              "bairro": "",
              "codIBGE": "355030",
              "uf": "SP",
              "pais": "",
              "clienteFinal": true,
              "indicadorIE": 1,
              "inscricaoMunicipal": "",
              "inscricaoEstadual": "",
              "inscricaoEstadualST": "",
              "suframa": "",
              "obs": "",
              "tags": []
            }

### Campos customizados [GET  /config/vendas/customizado]

O campo `customizado` possui até quatro índices:
* `xCampo1`;
* `xCampo2`;
* `xCampo3`;
* `xCampo4`;

Acesse este recurso (endpoint) para saber qual a descrição (label) de cada campo apresentado ao usuário.


+ Request (application/json)

    + Headers

            Authorization: Bearer [access_token]

+ Response 200 (application/json)

    + Headers

            X-RateLimit-Limit: 60
            X-RateLimit-Remaining: 59

    + Body

            {
              "xCampo1": "Observa\u00e7\u00f5es gerais",
              "xCampo2": "Laudo técnico"
            }


# Recebimentos [/recebimentos]
 Cadastro de contas a receber.

 | Situação | Descrição |
 |------|------------|
 | `20` | Em aberto. |
 | `40` | Recebido. |


### Listar [GET]

+ Request (application/json)

  + Headers

            Authorization: Bearer [access_token]

+ Response 200 (application/json)
  + Headers

            X-RateLimit-Limit: 60
            X-RateLimit-Remaining: 59

  + Body

            {
                "total": 1,
                "per_page": 50,
                "current_page": 1,
                "last_page": 4,
                "next_page_url": null,
                "prev_page_url": null,
                "from": 1,
                "to": 50,
                "data": [
                  {
                    "codigo": "1",
                    "codRecibo": "0",
                    "descricao": "Venda direta editada",
                    "previsao": "0",
                    "situacao": "40",
                    "codDisponivel": "1",
                    "codBoleto": "0",
                    "data": "2017-04-24",
                    "valor": "50.00",
                    "contato": "Nome do cliente",
                    "nomeDisponivel": "Caixa interno"
                  }
                ]
            }


### Detalhar [GET /recebimentos/{codigo}]


+ Parameters
    + codigo (required, number, `1`) ... Código do recebimento

+ Request (application/json)

    + Headers

              Authorization: Bearer [access_token]

+ Response 200 (application/json)

    + Headers

            X-RateLimit-Limit: 60
            X-RateLimit-Remaining: 59

    + Body

            {
              "codigo": 1,
              "codPlanoContas": 11,
              "codFormaPgto": 1,
              "numDoc": "",
              "descricao": "Descricao do recebimento",
              "valor": 100,
              "dtVenc": "2017-04-24",
              "dtPgto": "2017-04-24",
              "dtCad": "2017-04-24 11:35:17",
              "situacao": 40,
              "codContato": 1,
              "origem": "vendas",
              "obs": "",
              "tags": []
            }

+ Response 410 (application/json)
  Quando o registro foi apagado do sistema, o código de retorno é 410.

    + Headers

            X-RateLimit-Limit: 60
            X-RateLimit-Remaining: 59

    + Body

            {
              "errCode": 410,
              "errMsg": "Registro com código 1 não existe.",
              "errObs": null,
              "errFields": null
            }

+ Response 404 (application/json)
  Quando registro não for encontrado.

    + Headers

            X-RateLimit-Limit: 60
            X-RateLimit-Remaining: 59

    + Body

            {
              "errCode": 404,
              "errMsg": "Nenhum registro com código 1 econtrado",
              "errObs": null,
              "errFields": null
            }


### Editar [PUT /recebimentos/{codigo}]

+ Parameters
    + codigo (required, number, `1`) ... Código do recebimento

+ Request (application/json)

  + Headers

            Authorization: Bearer [access_token]

  + Body

            {
              "codPlanoContas": 1,
              "codFormaPgto": 0,
              "numDoc": "",
              "descricao": "Recebimento parcela 1/1",
              "valor": 500,
              "dtVenc": "2017-09-02",
              "dtPgto": "0000-00-00",
              "dtCad": "2017-06-02 11:57:03",
              "codContato": 7,
              "obs": "",
              "tags": [ "tag1", "tag2" ]
            }

+ Response 200 (application/json)

    + Headers

            X-RateLimit-Limit: 60
            X-RateLimit-Remaining: 58

    + Body

            {
              "codigo": 1,
              "descricao": "Recebimento parcela 1/1",
              "situacao": 20,
              "origem": "financeiro"
            }


### Efetivar [PUT /recebimentos/{codigo}/receber]

+ Parameters
    + codigo (required, number, `1`) ... Código do recebimento

+ Request (application/json)
    + Body

            {
              "valor": 200,
              "dtPgto": "2017-04-25"
            }

+ Response 200 (application/json)

    + Headers

            X-RateLimit-Limit: 60
            X-RateLimit-Remaining: 58

    + Body

            {
              "code": 200,
              "msg": "Recebimento efetuado com successo.",
              "obs": null,
              "fields": null
            }


### Remover [DELETE /recebimentos/{codigo}]

+ Parameters
    + codigo (required, number, `1`) ... Código do recebimento

+ Request (application/json)

+ Response 200 (application/json)

    + Body

            {
              "code": 200,
              "msg": "Recebimento com código 1 excluído com successo!",
              "obs": null,
              "fields": null
            }


# Pagamentos [/pagamentos]
 Cadastro de contas a pagar.

 | Situação | Descrição |
 |------|------------|
 | `10` | Em aberto. |
 | `30` | Pago. |


### Listar [GET]

+ Request (application/json)

  + Headers

            Authorization: Bearer [access_token]

+ Response 200 (application/json)

          {
              "total": 1,
              "per_page": 50,
              "current_page": 1,
              "last_page": 4,
              "next_page_url": null,
              "prev_page_url": null,
              "from": 1,
              "to": 50,
              "data": [
                {
                  "codigo": "1",
                  "codRecibo": "0",
                  "descricao": "Venda direta editada",
                  "previsao": "0",
                  "situacao": "40",
                  "codDisponivel": "1",
                  "codBoleto": "0",
                  "data": "2017-04-24",
                  "valor": "50.00",
                  "contato": "Nome do cliente",
                  "nomeDisponivel": "Caixa interno"
                }
              ]
          }


### Detalhar [GET /pagamentos/{codigo}]

+ Request (application/json)

  + Headers

            Authorization: Bearer [access_token]

+ Parameters
    + codigo (required, number, `1`) ... Código do pagamento

+ Response 200 (application/json)

    + Headers

            X-RateLimit-Limit: 60
            X-RateLimit-Remaining: 58

    + Body

            {
              "codigo": 1,
              "codPlanoContas": 11,
              "codFormaPgto": 1,
              "numDoc": "",
              "descricao": "Descricao do pagamento",
              "valor": 100,
              "dtVenc": "2017-04-24",
              "dtPgto": "2017-04-24",
              "dtCad": "2017-04-24 11:35:17",
              "situacao": 40,
              "codContato": 1,
              "origem": "vendas",
              "obs": "",
              "tags": []
            }

+ Response 410 (application/json)
 Quando o registro foi apagado do sistema, o código de retorno é 410.

    + Body

            {
              "errCode": 410,
              "errMsg": "Registro com código 1 não existe.",
              "errObs": null,
              "errFields": null
            }

+ Response 404 (application/json)
 Quando o registro não foi encontrado (Not found).

    + Body

            {
              "errCode": 404,
              "errMsg": "Nenhum registro com código 1 econtrado",
              "errObs": null,
              "errFields": null
            }

### Detalhar contato do pagamento [GET /pagamentos/{codigo}/contato]

+ Request (application/json)

  + Headers

            Authorization: Bearer [access_token]

+ Parameters
    + codigo (required, number, `1`) ... Código do pagamento

+ Response 200 (application/json)

    + Headers

            X-RateLimit-Limit: 60
            X-RateLimit-Remaining: 58

    + Body

            {
              "codigo": 1,
              "nome": "Contato de uma conta a receber",
              "fantasia": "",
              "nomeContato": "",
              "cpfcnpj": "",
              "tipo": [
                "cliente"
              ],
              "dtNasc": "",
              "dtCad": "2016-04-19 11:07:58",
              "emails": [],
              "fones": [],
              "cep": "",
              "logradouro": "",
              "numero": "",
              "complemento": "",
              "bairro": "",
              "cidade": "",
              "codIBGE": "",
              "uf": "RS",
              "pais": "",
              "clienteFinal": true,
              "indicadorIE": 9,
              "inscricaoMunicipal": "",
              "inscricaoEstadual": "",
              "inscricaoEstadualST": "",
              "suframa": "",
              "obs": "",
              "tags": []
            }

### Editar [PUT /pagamentos/{codigo}]

+ Parameters
    + codigo (required, number, `1`) ... Código do pagamento

+ Request (application/json)

    + Headers

            Authorization: Bearer [access_token]

    + Body

            {
              "codFormaPgto": 1,
              "numDoc": "",
              "descricao": "Descricao do pagamento",
              "valor": 200,
              "dtVenc": "2017-04-24",
              "codContato": 1,
              "obs": "",
              "tags": [ "tag1", "tag2"]
            }

+ Response 200 (application/json)

    + Headers

            X-RateLimit-Limit: 60
            X-RateLimit-Remaining: 58

    + Body

              {
                "codigo": 1,
                "codPlanoContas": 11,
                "codFormaPgto": 1,
                "numDoc": "",
                "descricao": "Descricao do pagamento",
                "valor": 100,
                "dtVenc": "2017-04-24",
                "dtPgto": "2017-04-24",
                "dtCad": "2017-04-24 11:35:17",
                "situacao": 40,
                "codContato": 1,
                "origem": "vendas",
                "obs": "",
                "tags": []
              }


### Efetuar pagamento  [PUT /pagamentos/{codigo}/pagar]

+ Parameters
    + codigo (required, number, `1`) ... Código do pagamento

+ Request (application/json)

    + Headers

              Authorization: Bearer [access_token]
    + Body

            {
              "valor": 200,
              "dtPgto": "2017-04-25"
            }

+ Response 200 (application/json)

    + Headers

            X-RateLimit-Limit: 60
            X-RateLimit-Remaining: 58

    + Body

            {
              "code": 200,
              "msg": "Pagamento efetuado com successo.",
              "obs": null,
              "fields": null
            }


### Remover [DELETE /pagamentos/{codigo}]

+ Request (application/json)

  + Headers

            Authorization: Bearer [access_token]

+ Parameters
    + codigo (required, number, `1`) ... Código do pagamento

+ Response 200 (application/json)

    + Body

            {
              "code": 200,
              "msg": "Pagamento com código 1 excluído com successo!",
              "obs": null,
              "fields": null
            }
