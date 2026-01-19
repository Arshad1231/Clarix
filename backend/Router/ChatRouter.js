import express from "express"
import {GetChatIdController,ChatWindowController } from "../Controller/ChatController.js";
const ChatRouter = express.Router()

ChatRouter.get("/getwindow/:id",ChatWindowController)
ChatRouter.get("/getchatid/:id",GetChatIdController)
export default ChatRouter;