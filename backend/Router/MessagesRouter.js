import express from "express"
import {PostMessageController} from "../Controller/MessagesController.js"
const MessagesRouter = express.Router()

MessagesRouter.post("/postmsg",PostMessageController)
export default MessagesRouter;