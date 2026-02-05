import React from "react";
import { useAuth } from "../../Context/AuthContent";

const MessagesComponent = ({ messages, activeFriend }) => {
  const { user } = useAuth(); // logged-in user

  return (
    <>
      <p style={{ fontWeight: "bold", marginBottom: "10px" }}>
        {activeFriend?.name}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {messages.map((msg) => {
          const isMyMessage = msg.senderId === user?._id;

          return (
            <div
              key={msg._id}
              style={{
                alignSelf: isMyMessage ? "flex-end" : "flex-start",
                maxWidth: "70%",
              }}
            >
              {/* Sender name */}
              <small style={{ color: "#555" }}>
                {isMyMessage ? "You" : activeFriend?.name}
              </small>

              {/* Message bubble */}
              <div
                style={{
                  backgroundColor: isMyMessage ? "#DCF8C6" : "#FFFFFF",
                  padding: "10px 14px",
                  borderRadius: "12px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  wordBreak: "break-word",
                }}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MessagesComponent;
