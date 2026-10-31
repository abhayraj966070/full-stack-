const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173"
    }
});

io.on("connection", (socket) => {

    console.log("User connected:", socket.id);

    socket.on("join-room", (roomId) => {
        socket.join(roomId);
    });

    socket.on("send-message", (data) => {

        io.to(data.roomId).emit("receive-message", {
            sender: data.sender,
            message: data.message,
            time: new Date()
        });

    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });

});

server.listen(5000, () => {
    console.log("Server running on port 5000");
});