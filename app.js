const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
require("dotenv/config");
const userRouter = require("./routers/userRouter.js");
const chatRouter = require("./routers/chatRouter.js");
const User = require("./models/User.js");
const bp = require("body-parser");
const path = require("path");
const port = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(bp.json({ limit: "100mb" }));
app.use(bp.urlencoded({ limit: "100mb", extended: true }));
app.use(express.json());
app.use("/user", userRouter);
app.use("/chat", chatRouter);
app.use(express.static(path.join(__dirname, "client", "build")));
app.use(express.static("../public"));

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const io = new Server(server, {
    cors: {
        origin: "https://leoteleport.herokuapp.com",
        methods: ["GET", "POST", "DELETE"],
    },
});

io.on("connection", (socket) => {
    console.log(socket.id);

    socket.on("join", (data) => {
        socket.join(data);
        console.log(data);
    });

    socket.on("send", (data) => {
        socket.to(data).emit("receive", data);
        console.log(data);
    });

    socket.on("disconnect", () => {
        console.log("Dis..", socket.id);
    });
});

mongoose.connect(process.env.DB, (err) => {
    if (err) console.log(err);
    else console.log("mongdb is connected");
});

app.listen(process.env.PORT || 5000, () => {
    console.log("START");
});

server.listen(5000, () => {
    console.log("START");
});