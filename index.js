require("dotenv").config();
const Express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRouter = require("./routes/userRouter");
const Auth = require("./middlewares/auth");
const { Rooms } = require("./mongoConfig");
const roomRouter = require("./routes/roomRouter");
const paymentRouter = require("./routes/paymentRouter")

const app = Express();
app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));
app.use(Auth);

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.cenrodd.mongodb.net/`
);

app.use("/users", userRouter);
app.use("/rooms", roomRouter);
app.use("/payment", paymentRouter);

app.post("/listing", async (req, res) => {
    try {
        console.log(req.body);
        const data = await Rooms.insertOne(req.body);
        res.send("data");
    } catch (error) {
        res.send({ err: error.message })
    }
})

app.listen(4000, () => console.log("server running at port 4000"));