require("dotenv").config();
const express = require("express");
const cors = require("cors");
const socketApp = express();
const authApp = express();
const http = require("http");
const server = http.createServer(socketApp);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});
const usersRouter = require("./AuthServer/authRoutes/users");
const { connect } = require("./AuthServer/config/DB");
const { initSocket } = require("./SocketServer/SocketLogic/roomLogic");

const socketPort = process.env.SOCKET_PORT || 3030;
const userAuthPort = process.env.USER_API_PORT || 3000;

authApp.use(express.json());
authApp.use(express.urlencoded({ extended: false }));
authApp.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  })
);
authApp.use("/users", usersRouter);

server.listen(socketPort, () => {
  console.log("socket app listening on port:3030");
});
authApp.listen(userAuthPort, () => {
  connect();
  console.log("Authentication app listening on port:3000");
});

initSocket(io);
