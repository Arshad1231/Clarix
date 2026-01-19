import Message from "../Model/Message.js"
import mongoose from "mongoose";

export const PostMessageController = async (req, res) => {
  try {
    const { text, chatId } = req.body;
    const senderId = req.session?.user?.id;

    if (!senderId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!text || !chatId) {
      return res.status(400).json({
        success: false,
        message: "Text and chatId are required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(chatId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid chatId",
      });
    }

    const message = await Message.create({
      text,
      chatId,
      senderId,
    });

    return res.status(201).json({
      success: true,
      message,
    });

  } catch (error) {
    console.error("PostMessageController error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

