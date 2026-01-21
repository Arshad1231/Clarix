import { getChatIdCURD } from "../../CURD/ChatsCURD";

const ChatList = ({ setActiveChatId, setActiveFriend, friends }) => {
  const openChat = async (friend) => {
    try {
      const res = await getChatIdCURD(friend);
      if (res.success) {
        setActiveChatId(res.chatId);
        setActiveFriend(friend);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    // ❌ NO WIDTH HERE
    <div className="h-full border-r border-gray-200 bg-white font-body flex flex-col">
      {/* HEADER */}
      <div className="px-4 py-3 border-b border-red-500">
        <h2 className="text-lg font-heading-two text-gray-900">
          Chats
        </h2>
        <p className="text-xs text-gray-500">
          Your conversations
        </p>
      </div>

      {/* LIST */}
      <div className="flex-1 overflow-y-auto">
        {friends.length === 0 ? (
          <p className="text-sm text-gray-500 text-center mt-10">
            No friends to chat with
          </p>
        ) : (
          friends.map((friend) => (
            <div
              key={friend._id}
              onClick={() => openChat(friend)}
              className="
                group flex items-center gap-3
                px-4 py-3
                cursor-pointer
                transition
                hover:bg-red-50
                border-b border-gray-100
              "
            >
              {/* AVATAR */}
              <div
                className="
                  w-10 h-10 rounded-full
                  bg-red-100
                  flex items-center justify-center
                  font-semibold text-red-600
                  shrink-0
                  group-hover:bg-red-500 group-hover:text-white
                  transition
                "
              >
                {friend.name?.charAt(0).toUpperCase()}
              </div>

              {/* NAME */}
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {friend.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  Click to chat
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatList;
