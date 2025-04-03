import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);

app.use(cors()); // Allow all origins or use a specific origin

const io = new Server(server, {
  cors: {
    origin: "*", // Update later with your Vercel domain for security
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("🧠 New client connected");

  socket.on("send-message", (msg) => {
    io.emit("receive-message", msg); // Broadcast to all clients
  });

  socket.on("disconnect", () => {
    console.log("🚪 Client disconnected");
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});
