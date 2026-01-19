import express from "express"
import { PostAnswerController } from "../Controller/AnswerController.js";
const AnswerRouter = express.Router()

AnswerRouter.post("/postanswer",PostAnswerController)

export default AnswerRouter;