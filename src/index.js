const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const userRouter = require("./Routes/userRouter");



app.use(express.json());
app.use("/users", userRouter);
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

