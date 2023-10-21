import { Router } from "express";
const userController = require("../controllers/userController");
const userRouter = Router();
userRouter.get("/", userController.get_user);
userRouter.post("/signin", userController.signin_post);
userRouter.post("/signup", userController.signup_post);
export default userRouter;
