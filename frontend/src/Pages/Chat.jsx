import { useState,useEffect } from "react";
import ChatList from "./Components/ChatList";
import ChatWindow from "./Components/ChatWindow";
import { GetFriendsCURD } from "../CURD/UserCURD";


const Chat = () => {
  
  useEffect(()=>{
    const getUsers=async ()=>{
        const response = await GetFriendsCURD()
        if(response.success){
          setFriends(response.friends)
        }
      }
    getUsers()
},[])

  const [activeChatId, setActiveChatId] = useState(null);
  const [activeFriend, setActiveFriend] = useState(null);
  const [Friends,setFriends] = useState([])

  

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <ChatList
        setActiveChatId={setActiveChatId}
        setActiveFriend={setActiveFriend}
        friends={Friends}
      />
      <ChatWindow
        activeChatId={activeChatId}
        activeFriend={activeFriend}
        friends={Friends}

      />
    </div>
  );
};

export default Chat;
