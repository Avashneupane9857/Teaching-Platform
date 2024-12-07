import app from "./app";
import { createWebSocketServer } from "./websocket";

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

createWebSocketServer(server); // WebSocket for chat and slide sync
