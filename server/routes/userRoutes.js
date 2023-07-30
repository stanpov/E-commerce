import express from "express";
import { createUser, login } from "../controllers/userContraller.js";
import { isAuth } from "../utils/utils.js";

const userRouter = express.Router();

userRouter.post("/signup", createUser);

userRouter.post("/signin", login);

export default userRouter;
