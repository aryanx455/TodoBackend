const express = require("express");
const todoRouter = express.Router();
const {
    getTodos,
    addTodo,
    deleteTodo,
    completeTodo,
    inCompleteTodo,
    updateTodo,
} = require("../Controllers/todoController");

todoRouter.get("/", (req, res) => {
    res.send("Hello from todoRouter");
});
todoRouter.post("/getTodos", getTodos);
todoRouter.post("/addTodo", addTodo);
todoRouter.post("/deleteTodo", deleteTodo);
todoRouter.post("/completeTodo", completeTodo);
todoRouter.post("/incompleteTodo", inCompleteTodo);
todoRouter.post("/updateTodo", updateTodo);

module.exports = todoRouter;
