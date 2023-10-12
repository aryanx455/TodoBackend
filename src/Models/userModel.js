const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    firstname: {
        type: String,
        required: [true, "Name is required"],
    },
    lastname: {
        type: String,
        required: [true, "Name is required"],
    },
});

exports.User = mongoose.model("User", userSchema);
