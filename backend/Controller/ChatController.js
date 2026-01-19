import Chat from "../Model/Chat.js";
import Message from "../Model/Message.js";

export const ChatWindowController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Chat ID is required",
      });
    }

    const messages = await Message.find({ chatId:id })
      .sort({ createdAt: 1 }); // oldest → newest

    return res.status(200).json({
      success: true,
      ChatId:id,
      messages,
    });

  } catch (error) {
    console.error("ChatWindowController error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export const GetChatIdController = async (req, res) => {
    try {
      const userId = req.session?.user?.id;
      const { id:friendId } = req.params;
  
      if (!userId || !friendId) {
        return res.status(400).json({
          success: false,
          message: "UserId and FriendId are required",
        });
      }
  
      // Prevent self-chat
      if (userId === friendId) {
        return res.status(400).json({
          success: false,
          message: "Cannot create chat with yourself",
        });
      }
  
      // 1️⃣ Find existing chat
      let chat = await Chat.findOne({
        participants: { $all: [userId, friendId] },
      });
  
      // 2️⃣ Create chat if not found
      if (!chat) {
        chat = await Chat.create({
          participants: [userId, friendId],
        });
      }
  
      // 3️⃣ Return chatId
      return res.status(200).json({
        success: true,
        chatId: chat._id,
        chat,
      });
  
    } catch (error) {
      console.error("GetChatIdController error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };
  
