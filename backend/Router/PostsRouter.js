import express from "express"
const PostsRouter = express.Router()

import {PostsAskController,GetAskedQuestionsController,GetDetailsController,ScrollPostController} from "../Controller/PostsController.js"

PostsRouter.post("/post",PostsAskController);
PostsRouter.get("/getaskquestions",GetAskedQuestionsController);
PostsRouter.get("/details/:id",GetDetailsController);
PostsRouter.get("/getposts",ScrollPostController);

export default PostsRouter;