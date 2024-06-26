const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://iochat.vercel.app",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
    socket.broadcast.emit("notify", data);
  });
});

server.listen("3002", () => {
  console.log("Server is running");
});
