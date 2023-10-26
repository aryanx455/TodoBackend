const bcrypt = require("bcrypt");
const { Todo } = require("../Models/todoModel");
const jwt = require("jsonwebtoken");

exports.getTodos = async (req, res) => {
    const token = req.body.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!verified) return res.status(401).json({ message: "Unauthorized" });
    try {
        const todos = await Todo.find({ email: req.body.email }).exec();
        res.json({ message: "Todos fetched successfully", todos });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

exports.addTodo = async (req, res) => {
    const token = req.body.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!verified) return res.status(401).json({ message: "Unauthorized" });
    const { task } = req.body;
    if (!task)
        return res.status(400).json({ message: "Please enter all fields" });
    try {
        const newTodo = await new Todo({
            email: req.body.email,
            task: task,
        });
        const result = await newTodo.save();
        res.json({ message: "Todo added successfully", result });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

exports.deleteTodo = async (req, res) => {
    const { token } = req.body;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!verified) return res.status(401).json({ message: "Unauthorized" });
    const { id } = req.body;
    if (!id)
        return res.status(400).json({ message: "Please enter all fields" });
    try {
        const result = await Todo.findByIdAndDelete(id).exec();
        res.json({ message: "Todo deleted successfully", result });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

exports.completeTodo = async (req, res) => {
    const {token, id,} = req.body;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!verified) return res.status(401).json({ message: "Unauthorized" });
    if (!id)
        return res.status(400).json({ message: "Please enter all fields" });
    try {
        const result = await Todo.findByIdAndUpdate(id, { iscompleted: true }).exec();
        res.json({ message: "Todo completed successfully", result });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}
exports.inCompleteTodo = async (req, res) => {
    const { token, id } = req.body;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!verified) return res.status(401).json({ message: "Unauthorized" });
    if (!id)
        return res.status(400).json({ message: "Please enter all fields" });
    try {
        const result = await Todo.findByIdAndUpdate(id, {
            iscompleted: false,
        }).exec();
        res.json({ message: "Todo Incompleted successfully", result });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.updateTodo = async (req, res) => {
    const { token, id, newTask } = req.body;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!verified) return res.status(401).json({ message: "Unauthorized" });
    if (!id)
        return res.status(400).json({ message: "Please enter all fields" });
    try {
        const result = await Todo.findByIdAndUpdate(id, {
            task: newTask,
        }).exec();
        res.json({ message: "Todo updated successfully", result });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};