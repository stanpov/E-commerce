import express from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import { generateToken } from "../utils/utils.js";

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  const { userName, email, password } = req.body;

  let existingUser = await User.findOne({ email: email });

  if (existingUser) {
    return res
      .status(400)
      .send({ message: "User with this email already exists" });
  }
  const newUser = new User({
    userName: userName,
    email: email,
    password: bcrypt.hashSync(password, Number(process.env.SALT)),
    isAdmin: req.body.userName === "admin" ? true : false,
  });
  console.log(newUser);

  const user = await newUser.save();

  res.send({
    _id: user._id,
    userName: user.userName,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

userRouter.post("/signin", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateToken(user);
      if (!req.cookies["auth_token"]) {
        res.cookie("auth_token", token, {
          expires: new Date(Date.now() + 1000 * 3600),
          httpOnly: true,
        });
      }
      return res.status(200).send("Successfully logged in.");
    } else {
      res.status(401).send({ message: "Invalid email or password." });
    }
  } else {
    res
      .status(401)
      .send({ message: "User with this cridentials does not exists!" });
  }
});

export default userRouter;
