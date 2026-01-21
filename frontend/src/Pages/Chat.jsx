import { useState, useEffect } from "react";
import ChatList from "./Components/ChatList";
import ChatWindow from "./Components/ChatWindow";
import { GetFriendsCURD } from "../CURD/UserCURD";

const Chat = () => {
  const [activeChatId, setActiveChatId] = useState(null);
  const [activeFriend, setActiveFriend] = useState(null);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await GetFriendsCURD();
        if (response?.success) {
          setFriends(response.friends || []);
        }
      } catch (err) {
        console.error("Failed to load friends", err);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return (
    <div className="h-screen flex flex-col font-body bg-gray-100 mt-10">
      {/* HEADER */}
      <div className="sticky top-0 z-10 bg-white shadow px-6 py-4 border-b border-red-500">
        <h1 className="text-xl font-heading-two text-gray-900">
          Messages
        </h1>
        <p className="text-sm text-gray-500">
          Chat with your friends in real time
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT – CHAT LIST */}
        <div className="w-80 bg-white border-r border-gray-200">
          {loading ? (
            <ChatListSkeleton />
          ) : (
            <ChatList
              friends={friends}
              setActiveChatId={setActiveChatId}
              setActiveFriend={setActiveFriend}
            />
          )}
        </div>

        {/* RIGHT – CHAT WINDOW */}
        <div className="flex-1 bg-gray-50">
          {activeFriend ? (
            <ChatWindow
              activeChatId={activeChatId}
              activeFriend={activeFriend}
            />
          ) : (
            <EmptyChat />
          )}
        </div>
      </div>
    </div>
  );
};

/* ---------- EMPTY STATE ---------- */
const EmptyChat = () => (
  <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
    <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center text-red-500 text-xl mb-3">
      💬
    </div>
    <p className="font-medium">Select a conversation</p>
    <p className="text-sm">
      Choose a friend from the left to start chatting
    </p>
  </div>
);

/* ---------- SKELETON ---------- */
const ChatListSkeleton = () => (
  <div className="p-4 space-y-3 animate-pulse">
    {[1, 2, 3, 4].map((i) => (
      <div
        key={i}
        className="flex items-center gap-3"
      >
        <div className="w-10 h-10 rounded-full bg-gray-200" />
        <div className="flex-1">
          <div className="h-3 bg-gray-200 rounded w-2/3 mb-1" />
          <div className="h-2 bg-gray-200 rounded w-1/3" />
        </div>
      </div>
    ))}
  </div>
);

export default Chat;
