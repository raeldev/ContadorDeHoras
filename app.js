// Primeiros passos
// 1 - Instalar Yarn e inicializar package.json
//  1.0 - Extensões: ESLint, Material Icon Theme, Nunjucks, EditorConfig for VSCode, Prettier

// 2 - Instalar Express
//  2.0 - "yarn add express"
//  2.1 - Importar express "const = express = require('express');"
//  2.2 - Declarar um server "const app = express();"
//  2.3 - Definir porta de escuta "app.listen(3000);"

// 3 - Instalar nodemon
//  3.0 - "yarn add nodemon -D" (-D somente development)
//  3.1 - Adicionar script de inicialização em package.json "scripts: { "start": "nodemon index.js" }"
//  3.2 - "yarn start" para rodar o nodemon

// 4 - Instalando nunjucks
//  4.0 - "yarn add nunjucks"
//  4.1 - criar pasta de "views"
//  4.2 - configurar nunjucks => "nunjucks.configure("views", { autoescape: true, express: app, watch: true });"
//  4.3 - configurar extensão dos arquivos nunjucks => "app.set("view engine", "njk");"
//  4.4 - {{ variables }}
//  4.5 - {% for user in users %} <li>{{ user.name }}</li> {% endfor %}

// 5 - Instalando EditorConfig
//  5.0 - Instalar a extensão e criar .editorConfig
//  5.1 - "root = true" => É o arquivo principal e global do editor config
//  5.2 - "[*]" => Aplicar para todos os tipos de arquivos
//  5.3 - "indent_style = space" = space" Tipo de identação, usando espacos ou tabulações
//  5.4 - "indent_size = 2" => space de 2 linhas
//  5.5 - "charset = utf-8" => tipo de codificação da escrita
//  5.6 - "trim_trailing_whitespace = true" => remove espaços do final das linhas
//  5.7 - "inser_final_newline = true" => adiciona "enter" ao final do código

// 6 - Instalando Prettier e EsLint
//  6.0 - instalar as extensões do VSCODE (prettier e ESLINT), reiniciar VSCODE
//  6.1 - "yarn eslint -D" e "yarn eslint --init"
//  6.2 - deletar package.lock.json e rodar "yarn" pra recarregar os packages
//  6.3 - .eslint.json -> em "readonly", colocar "readable"

// 7 - adicionnar configurações gerais "settings.json"
//  7.1 - "editor.formatOnSave": true
//  7.1 - "prettier.eslintIntegration": true

// 5 - Há 3 formas 3 formas de pegar parâmetros das requisições
//  5.0 - /?name=fulano => ${req.query.name}
//  5.1 - /fulado => app.get("/:nome", ...) ${req.params.nome}
//  5.2 - utilizando formulários com "app.use(express.urlencoded({extended: false}));" => "req.body"

// 6 - Usando Middlewares (req, res) => { return next(); }
//  6.0 - usando middleware em uma rota app.get("/", middlewareName, (req, res) => ...
//  6.1 - usando middleware em todas as rotas app.use(middlewareName);

// 7 - Variáveis globais em tempo real, na memória da aplicação "EventLoop"

const express = require("express");
const app = express();
const nunjucks = require("nunjucks");
const tarefas = [];

nunjucks.configure("views", { autoescape: true, express: app, watch: true });
app.set("view engine", "njk");
app.use(express.urlencoded({ extended: false }));

// Middlewares
app.use(express.static("./views")); // mapeando arquivos estaticos com express

app.get("/", (req, res) => {
  return res.redirect("/clock");
});

app.get("/clock", (req, res) => {
  return res.render("home");
});

app.get("/tasks", (req, res) => {
  return res.render("tasks", { tarefas });
});

// iniciando próxima task
app.post("/next-task", (req, res) => {
  var task = req.body;
  if (task != undefined) {
    var times = [];
    task.elapsedTime.split(":").forEach(a => {
      times.push(a * 1);
    });

    if (times[2] > 0) {
      tarefas.push({ timeElapsed: task.elapsedTime });
      return res.send("ok");
    }
  }

  return res.send("Error: not received taks with spended time.");
});

// excuta requisições na porta 3000
app.listen(3000);
