const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require('uuid');


const todos = [];


app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/public`));

app.get("/", (req, res) => {
  res.render(`${__dirname}/public/index.ejs`, { todos });
});

// ########
// Add Todo
// ########
app.post("/addtodo", (req, res) => {
  const todo = {task: req.body.todo, isComplete: false, id: uuidv4()};
  todos.unshift(todo);
  res.json(todo);
});

// #############
// Complete Todo
// #############
app.patch("/donetodo/:id", (req, res) => {
  const index = todos.findIndex(e => e.id === req.params.id);
  todos[index].isComplete = !todos[index].isComplete;
  res.json(todos[index].isComplete);
});

// ###########
// Update Todo
// ###########
app.patch("/updatetodo", (req, res) => {
  const index = todos.findIndex(e => e.id === req.body.id);
  todos[index].task = req.body.task;
  res.json(req.body.task);
});

// ###########
// Delete Todo
// ###########
app.delete("/deletetodo/:id", (req, res) => {
  const index = todos.findIndex(e => e.id === req.params.id);
  todos.splice(index, 1);
  res.json(req.params.id)
});

module.exports = app;