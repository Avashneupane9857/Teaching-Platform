import { WebSocketServer } from 'ws';
interface ClientMessage {
  type: "chat" | "slide";
  classId: number;
  content: string | number; // Chat message or slide index
}
const clients: Record<number, Set<any>> = {};
const wss = new WebSocketServer({ port: 8080 });
wss.on("connection", (socket) => {
    socket.on("message", (message) => {
      const parsed: ClientMessage = JSON.parse(message.toString());
      const { type, classId, content } = parsed;

      if (!clients[classId]) clients[classId] = new Set();
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