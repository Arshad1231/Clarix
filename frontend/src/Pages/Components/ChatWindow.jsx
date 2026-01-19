import { useEffect, useState } from "react";
import axios from "axios";
import { GetChatCURD } from "../../CURD/ChatsCURD";
import MessagesComponent from "./MessagesComponent";
import { PostMessageCURD } from "../../CURD/MessagesCURD";
import socket from "../../socket";


const ChatWindow = ({ activeChatId, activeFriend,friends }) => {
  const [messages, setMessages] = useState([]);
  const [Text,setText]= useState("")
  useEffect(() => {
    if (!activeChatId) return;
    socket.emit("joinChat", activeChatId);

    const GetChatWindowData = async(activeChatId)=>{
      const response = await GetChatCURD(activeChatId);
      if(response.messages){
        setMessages(response.messages)
      }

    }
    GetChatWindowData(activeChatId)
  }, [activeChatId]);

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });
  
    return () => {
      socket.off("receiveMessage");
    };
  }, []);


  if (!activeChatId) {
    return (
      <div style={{ width: "70%", padding: "20px" }}>
        Select a friend to start chatting
      </div>
    );
  }

  const handleSubmitMessage = async (e)=>{
    e.preventDefault();
    const pay_load ={
      chatId: activeChatId,
      text:Text
      
    }
    const response = await PostMessageCURD(pay_load)
    if (response.success){
      // 2️⃣ Emit via socket
      socket.emit("sendMessage", response.message);

      // 3️⃣ Update sender UI instantly
      setMessages((prev) => [...prev, response.message]);
      setText("");    }
  }

  return (
    
    <div style={{ width: "70%", padding: "20px" }}>
      <h3>{activeFriend?.name}</h3>

      <div style={{ minHeight: "80%" }}>
        {messages.length!==0 ? <>
        <MessagesComponent
          messages={messages}
          activeFriend={activeFriend}
        />
        </>
        :
        <>
        <p>No Messaages Yet</p>
        </>
        }
      </div>

        <form onSubmit={(e)=>{handleSubmitMessage(e)}}>
          <input 
            type="text" 
            name="message" 
            id="message" 
            placeholder="Type Youre message Here"   
            value={Text}
            onChange={(e)=>{setText(e.target.value)}
          }/> 
          <br />
          <button type="submit">Submit</button>
        </form>
    </div>
  );
};

export default ChatWindow;
