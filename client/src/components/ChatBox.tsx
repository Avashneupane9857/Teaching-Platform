import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

const WEBSOCKET_URL = "ws://localhost:8080";

const Chat: React.FC = () => {
  const { classId } = useParams<{ classId: string }>();
  const [messages, setMessages] = useState<{ text: string; self: boolean }[]>(
    []
  );
  const [input, setInput] = useState<string>("");
  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!classId) return;

    socket.current = new WebSocket(WEBSOCKET_URL);

    socket.current.onopen = () => {
      const joinMessage = JSON.stringify({
        type: "join",
        classId: parseInt(classId),
      });
      socket.current?.send(joinMessage);
      console.log("Connected to WebSocket server");
    };

    socket.current.onmessage = (event) => {
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
  }, [classId]);

  const sendMessage = () => {
    if (input.trim() && socket.current?.readyState === WebSocket.OPEN) {
      const message = {
        type: "chat",
        classId: parseInt(classId || "0"),
        content: input,
      };
      socket.current.send(JSON.stringify(message));
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input, self: true },
      ]);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-100">
      {/* Chat Header */}
      <header className="bg-blue-600 text-white text-center py-3 text-lg font-semibold shadow-md">
        Classroom Chat
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white shadow-inner">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center">No messages yet</p>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`p-3 rounded-md max-w-sm break-words ${
                message.self
                  ? "bg-green-200 self-end text-right ml-auto"
                  : "bg-blue-200 text-left mr-auto"
              }`}
            >
              {message.text}
            </div>
          ))
        )}
      </div>

      {/* Chat Input */}
      <div className="flex items-center gap-2 p-4 bg-gray-200 border-t border-gray-300">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
        />
        <button
          onClick={sendMessage}
          className="px-5 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-all"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
