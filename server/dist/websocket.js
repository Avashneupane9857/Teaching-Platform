"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const clients = {};
const wss = new ws_1.WebSocketServer({ port: 8080 });
wss.on("connection", (socket) => {
    socket.on("message", (message) => {
        const parsed = JSON.parse(message.toString());
        const { type, classId, content } = parsed;
        if (!clients[classId])
            clients[classId] = new Set();
        clients[classId].add(socket);
        // Broadcast to all clients in the class
        clients[classId].forEach((client) => {
            if (client !== socket) {
                client.send(JSON.stringify({ type, content }));
            }
        });
    });
    socket.on("close", () => {
        for (const classId in clients) {
            clients[classId].delete(socket);
        }
    });
});
