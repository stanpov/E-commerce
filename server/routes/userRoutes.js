import express from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import { generateToken } from "../utils/utils.js";

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  const newUser = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, Number(process.env.SALT)),
    isAdmin: req.body.isAdmin || false,
  });

  const user = await newUser.save();

  res.send({
    _id: user._id,
    userName: user.userName,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user),
  });
});

userRouter.post("/signin", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        _id: user._id,
        userName: user.userName,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      });
      return;
    } else {
      res.status(401).send({ message: "Invalid email or password." });
    }
  }

  res.status(401).send({ message: "Invalid email or password" });
});

export default userRouter;
