import express from "express";
import {
  changeMyPassword,
  confirmPassword,
  createUser,
  login,
  logout,
  resetPasswor,
  verifyUser,
  updateUserInformation,
  getUserInformation,
} from "../controllers/userContraller.js";
import { isAuth } from "../utils/utils.js";

const userRouter = express.Router();

userRouter.post("/signup", createUser);

userRouter.post("/signin", login);

userRouter.post("/signout", isAuth, logout);

userRouter.get("/verify/:userId/:otp", verifyUser);

userRouter.post("/resetpassword", resetPasswor);

userRouter.put("/confirmpassword", confirmPassword);

userRouter.put("/changepassword", changeMyPassword);

userRouter.post("/updateuserinformation/:userId", updateUserInformation);

userRouter.get("/getuserInformation/:userId", getUserInformation);

export default userRouter;
