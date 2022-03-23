# VTEX-LOCAL

Proxy reverso e automatizador de tarefas, totalmente simples e personalizável.

## Pre-requisitos

- Node - http://nodejs.org/
- Gulp - https://gulpjs.com/

## Instalação

Clone este repositório

## Início

**Antes de continuar**, insira o nome da loja em `accountName` no arquivo `package.json`. Exemplo:

```json
{
  "accountName": "minhaloja"
}
```

Entre no diretório do arquivo que foi clonado e execute os seguintes comandos respectivamente:

```shell
    npm install
    npm start
```

Sua loja abrirá automaticamente com a url correta `minhaloja.vtexlocal.com.br`

## Recursos

Todos os arquivos `src/` são compilados, otimizados e copiados para a pasta `build/arquivos`.

Você pode alterar este processo alterando o arquivo `gulpfile.js`.

Suportado atualmente:

- LiveReload
- Css minify
- JS Bundler
- Autoprefixer
- Sass

## Avisos

- Usando novo arquivo de speed
- A pasta /src será para buildar os arquivos
- A pasta repo-antigo são os arquivos do repositório antigo que não funcionava
- para atualizar, o ideal é pegar o arquivo que será alterado de /repo-antigo, colocar em /src e alterar as chamadas e etc...
- os arquivos .scss.txt estão dessa forma apenas para serem ignorados pelo gulp e não gerar erros
- Não funciona a sintaxe de import nos arquivos, usar o https://www.npmjs.com/package/gulp-include
