# Lab Compiladores

## Dependências

Antes de executar este projeto, certifique-se de que você tenha as seguintes dependências instaladas:

- Docker Desktop
- Node (versão mais recente)

### Instalando o Docker Desktop

Para instalar o Docker Desktop, acesse o [site oficial do Docker](https://docs.docker.com/get-docker/) e siga as instruções de instalação adequadas para o seu sistema operacional.

### Instalando o Node

Para instalar o Node, acesse o [site oficial do Node.js](https://nodejs.org/en/download/) e siga as instruções de instalação adequadas para o seu sistema operacional.

### Clonando o projeto

Para clonar o projeto, execute o seguinte comando em seu terminal:

```
git clone https://github.com/DanielDLJ/Lab-Compiladores.git
```

### Buildar o LaTeX

Para buildar o LaTeX, siga os seguintes passos:

1. Navegue até o diretório "latex" dentro do diretório "express-api".

```
cd express-api/latex
```

2. Execute o comando a seguir para construir a imagem do Docker do LaTeX.

```
docker-compose build latex
```

### Execução do Front-end e API

Para executar o front-end e a API, siga os seguintes passos:

Na primeira vez que você executar o projeto, navegue até os diretórios "react-markdown" e "express-api" e execute o comando "npm i" em cada diretório para instalar as dependências necessárias.

```
cd react-markdown
npm i

cd ../express-api
npm i
```

Para executar a API, navegue até o diretório "express-api" e execute o comando a seguir:

```
cd express-api
npm run dev
```

Para executar o front-end, navegue até o diretório "react-markdown" e execute o comando a seguir:

```
cd react-markdown
npm run start
```

**Observação**: Para o front-end e a API funcionarem corretamente, é necessário que ambos estejam sendo executados ao mesmo tempo.
