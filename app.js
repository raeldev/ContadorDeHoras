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
