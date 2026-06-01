const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
// Dynamic Port for Render
const PORT = process.env.PORT || 3001;
const io = new Server(server, {
  cors: {
    origin: [
        "http://localhost:3000",
        /\.vercel\.app$/
    ],
    methods: ["GET", "POST"],
  },
});

//  Keep track of users currently inside the Casa
let activeUsers = {};

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // When a user officially enters with a nickname and avatar
  socket.on("join_casa", (userData) => {
    activeUsers[socket.id] = {
      id: socket.id,
      nickname: userData.nickname,
      avatar: userData.avatar,
    };
    // Broadcast the fresh list of everyone inside to all connected clients
    io.emit("active_users_list", Object.values(activeUsers));
  });

  // Fixed message broadcast listener
  socket.on("send_message", (data) => {
    io.emit("receive_message", data);
  });

  // Clean up when someone closes the tab or leaves
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    delete activeUsers[socket.id];
    // Send the updated list so they instantly disappear from everyone's sidebar
    io.emit("active_users_list", Object.values(activeUsers));
  });
});

server.listen(3001, () => {
  console.log("CalmCasa Backend running on port 3001");
});
