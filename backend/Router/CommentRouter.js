import express from "express"
import { PostCommentController } from "../Controller/CommentController.js";
const CommentRouter = express.Router()

CommentRouter.post("/postcomment",PostCommentController)

export default CommentRouter;