import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { createAccessToken } from "../utils/utils.js";

export const createUser = async (req, res) => {
  try {
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
      //   isAdmin: req.body.userName === "admin" ? true : false, temporary remove just to test when is Admin
      isAdmin: req.body.isAdmin,
    });
    const user = await newUser.save();

    res.send({
      _id: user._id,
      userName: user.userName,
      email: user.email,
      isAdmin: user.isAdmin,
      password: user.password,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Something went wrong, please try again later." });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ message: "Please add all fields" });
    }
    const user = await User.findOne({ email });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Password is Incorrect" });
      }
      const access_token = createAccessToken({
        id: user._id,
        isAdmin: user.isAdmin,
      });

      res.cookie("access_token", access_token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, //30
      });

      res.json({
        message: "Login Success",
        access_token,
      });
    } else {
      res
        .status(401)
        .send({ message: "User with this cridentials does not exists!" });
    }
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
};
