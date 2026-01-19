import axios from "axios";
import { useAuth } from "../../Context/AuthContent";
import { useEffect } from "react";
import { getChatIdCURD } from "../../CURD/ChatsCURD";

const ChatList = ({ setActiveChatId, setActiveFriend,friends }) => {

    
  
  const openChat =  async (friend) => {
    try {
      const res = await getChatIdCURD(friend)
      if (res.success){
        setActiveChatId(res.chatId)
        setActiveFriend(friend)
      }
    } catch (error) {
      console.log(error.message)
    }
    
  };

  

  return (
    
    <div style={{ width: "30%", borderRight: "1px solid #ccc" }}>
      {friends.map((friend) => (
        <div
          key={friend._id}
          onClick={() => openChat(friend)}
          style={{ padding: "10px", cursor: "pointer" }}
        >
          {friend.name}
        </div>
      ))}
    </div>
  );
};

export default ChatList;
