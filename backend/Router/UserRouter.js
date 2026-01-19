import express from "express"
const UserRouter = express.Router()

import {
    userRegisterController,userLoginController,getMeController,userLogoutController,getUserDetailsController,getAllUsersController,sendRequestController,AcceptReqController,RejectRequestController,GetFrndsController
} from "../Controller/UserController.js"

import { upload } from "../config/multer.js";

UserRouter.post("/register",
  upload.single("avatar"),
  userRegisterController
);
UserRouter.post("/login",userLoginController);
UserRouter.get("/me",getMeController);
UserRouter.post("/logout",userLogoutController);
UserRouter.get("/getone/:id",getUserDetailsController)
UserRouter.get("/getall",getAllUsersController)
UserRouter.post("/sendreq",sendRequestController)
UserRouter.post("/accreq",AcceptReqController)
UserRouter.post("/rejreq",RejectRequestController)
UserRouter.get("/getfrnds",GetFrndsController)


export default UserRouter;