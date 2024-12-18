import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

const WEBSOCKET_URL = "ws://localhost:8080";

const Chat: React.FC = () => {
  const { classId } = useParams<{ classId: string }>(); // Extract classId from the URL
  const [messages, setMessages] = useState<{ text: string; self: boolean }[]>(
    []
  );
  const [input, setInput] = useState<string>("");
  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!classId) return; // Ensure classId is available before proceeding

    // Initialize WebSocket connection
    socket.current = new WebSocket(WEBSOCKET_URL);

    socket.current.onopen = () => {
      // Send a message to join the class
      const joinMessage = JSON.stringify({
        type: "join",
        classId: parseInt(classId),
      });
      socket.current?.send(joinMessage);
      console.log("Connected to WebSocket server");
    };

    socket.current.onmessage = (event) => {
      // Parse received message
      const message = JSON.parse(event.data);
      if (message.type === "chat") {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: message.content, self: false },
        ]);
      }
    };

    socket.current.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    return () => {
      socket.current?.close();
    };
  }, [classId]); // Re-run effect if classId changes

  const sendMessage = () => {
    if (input.trim() && socket.current?.readyState === WebSocket.OPEN) {
      // Send chat message in the required format
      const message = {
        type: "chat",
        classId: parseInt(classId || "0"),
        content: input,
      };
      socket.current.send(JSON.stringify(message));

      // Update the local state with the sent message
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input, self: true },
      ]);
      setInput("");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 justify-end">
      {/* Chat box */}
      <div className="flex flex-col w-1/3 h-full bg-white shadow-lg">
        <header className="bg-blue-600 text-white text-center py-4 text-xl">
          Chat System
        </header>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-2 rounded-md max-w-sm ${
                message.self
                  ? "bg-green-200 self-end text-right"
                  : "bg-blue-200 text-left"
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div className="flex items-center p-4 bg-gray-100 border-t border-gray-300">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            onClick={sendMessage}
            className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
