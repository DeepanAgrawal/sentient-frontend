// src/components/playground/MessageWindow.tsx
import { Message } from "ai";
import React, { useEffect, useRef } from "react";

const MessageWindow: React.FC<{ messages: Message[] }> = ({ messages }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Automatically scroll to the bottom when new messages are added
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="message-window overflow-auto bg-gray-100 p-4 rounded-lg shadow-md max-h-[90%] min-h-[90%]">
      {messages.length === 0 ? (
        <div className="text-gray-500">
          No messages yet. Start a conversation!
        </div>
      ) : (
        messages.map((message, index) => (
          <div
            key={index}
            className={`relative p-3 mb-4 rounded-lg max-w-[70%] ${
              message.role === "user"
                ? "bg-blue-500 text-white ml-auto before-user-bubble"
                : "bg-gray-200 text-black mr-auto before-assistant-bubble"
            }`}
          >
            <p key={message.id}>
              <strong>{message.role} : </strong>
              {message.content}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default MessageWindow;
