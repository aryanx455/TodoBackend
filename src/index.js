const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const userRouter = require("./Routes/userRouter");
const todoRouter = require("./Routes/todoRouter");
const cors = require("cors");


app.use(cors());



app.use(express.json());
app.use("/users", userRouter);
app.use('/todos', todoRouter);
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
})
.catch((err) => {
    console.error(err);
});

