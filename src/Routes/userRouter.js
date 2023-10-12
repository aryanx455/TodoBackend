const express = require("express");
const userRouter = express.Router();
const {
    signUp,
    login,
    resetPassword,
    verifyOtp,
} = require("../Controllers/userController");



userRouter.get("/", (req, res) => {
    res.send("Hello from userRouter");
});
userRouter.post("/login", login);
userRouter.post("/signup",signUp);
userRouter.post("/reset-password",resetPassword);
userRouter.post("/verify-otp", verifyOtp);
module.exports = userRouter;