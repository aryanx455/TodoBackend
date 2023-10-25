const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: false,
    },
    task: {
        type: String,
        required: [true, "Task is required"],
        unique: true,
    },
    isCompleted : {
        type: Boolean,
        default: false,
    },
    createdAt: { type: Date, default: Date.now },
});

exports.Todo = mongoose.model("Todo", todoSchema);
