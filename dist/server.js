"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app.use((0, cors_1.default)()); // Allow all origins or use a specific origin
const io = new socket_io_1.Server(server, {
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
