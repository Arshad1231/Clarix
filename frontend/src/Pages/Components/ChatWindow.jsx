import { useEffect, useRef, useState } from "react";
import { GetChatCURD } from "../../CURD/ChatsCURD";
import MessagesComponent from "./MessagesComponent";
import { PostMessageCURD } from "../../CURD/MessagesCURD";
import socket from "../../socket";

const ChatWindow = ({ activeChatId, activeFriend }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  /* ---------- FETCH CHAT ---------- */
  useEffect(() => {
    if (!activeChatId) return;

    socket.emit("joinChat", activeChatId);

    const fetchChat = async () => {
      const response = await GetChatCURD(activeChatId);
      if (response?.messages) {
        setMessages(response.messages);
      }
    };

    fetchChat();
  }, [activeChatId]);

  /* ---------- SOCKET LISTENER ---------- */
  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => socket.off("receiveMessage");
  }, []);

  /* ---------- AUTO SCROLL ---------- */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ---------- SEND MESSAGE ---------- */
  const handleSubmitMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const payload = {
      chatId: activeChatId,
      text,
    };

    const response = await PostMessageCURD(payload);

    if (response?.success) {
      socket.emit("sendMessage", response.message);
      setMessages((prev) => [...prev, response.message]);
      setText("");
    }
  };

  /* ---------- EMPTY STATE ---------- */
  if (!activeChatId) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        Select a friend to start chatting
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full font-body bg-gray-50">
      {/* HEADER */}
      <div className="px-4 py-3 bg-white border-b border-red-500 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center font-semibold text-red-600">
          {activeFriend?.name?.charAt(0).toUpperCase()}
        </div>

        <div>
          <p className="font-semibold text-gray-900">
            {activeFriend?.name}
          </p>
          <p className="text-xs text-gray-500">
            Online
          </p>
        </div>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
        {messages.length > 0 ? (
          <MessagesComponent
            messages={messages}
            activeFriend={activeFriend}
          />
        ) : (
          <p className="text-sm text-gray-400 text-center mt-10">
            No messages yet
          </p>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT */}
      <form
        onSubmit={handleSubmitMessage}
        className="p-3 bg-white border-t border-gray-200 flex items-center gap-2"
      >
        <input
          type="text"
          placeholder="Type your message…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="
            flex-1 rounded-full px-4 py-2 text-sm
            border border-gray-300
            focus:border-red-500 focus:ring-2 focus:ring-red-500/30
            focus:outline-none
          "
        />

        <button
          type="submit"
          className="
            px-4 py-2 rounded-full
            bg-red-500 text-white text-sm font-semibold
            hover:bg-red-600 transition
          "
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
