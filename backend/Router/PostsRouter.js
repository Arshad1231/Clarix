import express from "express"
const PostsRouter = express.Router()

import {PostsAskController,GetAskedQuestionsController,GetDetailsController,ScrollPostController,HandleVoteController} from "../Controller/PostsController.js"

PostsRouter.post("/post",PostsAskController);
PostsRouter.get("/getaskquestions",GetAskedQuestionsController);
PostsRouter.get("/details/:id",GetDetailsController);
PostsRouter.get("/getposts",ScrollPostController);
PostsRouter.post("/vote/:id",HandleVoteController);

export default PostsRouter;