import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import {
  createAccessToken,
  sentOTPVerificationEmail,
  sendNewPassword,
} from "../utils/utils.js";
import { userOTPVerification } from "../models/userOTPVerification.js";
import { userNewPasswordVerification } from "../models/userNewPasswordVerification.js";

export const createUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (userName.length <= 4) {
      return res
        .status(400)
        .send({ message: "Username should be at least 5 characters long." });
    }

    if (!/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)) {
      return res.status(400).send({ message: "invalid email address!" });
    }

    if (password.length <= 4) {
      return res
        .status(400)
        .send({ message: "Password should be at least 5 characters long." });
    }

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
      // isAdmin: req.body.isAdmin,
      verified: false,
    });
    const user = await newUser.save().then((response) => {
      sentOTPVerificationEmail(response, res);
      res.status(201).send({
        message: "User created, check your email for verification.",

        userId: response._id,
        verified: response.verified,
      });
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

      if (req.cookies["access_token"]) {
        return res.status(406).json({ message: "Already logged in." });
      }
      const access_token = createAccessToken({
        id: user._id,
        isAdmin: user.isAdmin,
        isVerified: user.verified,
      });

      res.cookie("access_token", access_token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, //30
      });

      res.json({
        message: "Login Success",
        id: user._id,
        access_token: access_token,
        isVerified: user.verified,
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

export const logout = async (req, res) => {
  try {
    res.clearCookie("access_token");
    return res.status(200).json({ data: { message: "Logout Successfully" } });
  } catch (error) {}
};

export const verifyUser = async (req, res) => {
  const { userId, otp } = req.params;
  try {
    const verifyUser = await userOTPVerification.findOne({ userId: userId });

    if (!verifyUser) {
      return res.status(404).json({
        message:
          "No user has been found for verifycation, check if user is already verified",
      });
    }
    if (verifyUser.expiresAt < Date.now()) {
      return res
        .status(404)
        .json({ message: "OTP verification has been expired." });
    }
    if (verifyUser.otp !== otp) {
      return res.status(404).json({
        message: "OTP verification failed. Wrong OTP number",
      });
    }
    const mainUser = await User.findOne({ _id: verifyUser.userId });
    if (!mainUser) {
      return res
        .status(404)
        .json({ message: "No user has been found for verifycation" });
    }
    await User.findOneAndUpdate({ _id: verifyUser.userId }, { verified: true });
    await verifyUser.deleteOne({ userId: verifyUser.userId });
    return res
      .status(200)
      .json({ data: { message: "User successfully verified!" } });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong with verification" });
  }
};

export const resetPasswor = async (req, res) => {
  const { email } = req.body;

  const existingUser = await User.find({ email: email });

  if (existingUser.length === 0) {
    return res.status(404).json({ message: "User with this email not fond." });
  } else {
    await sendNewPassword(existingUser).then(async (response) => {
      if (response) {
        const newHasPass = bcrypt.hashSync(
          response.toString(),
          Number(process.env.SALT)
        );
        const newPassUserVerificationExist =
          await userNewPasswordVerification.find({
            userEmail: existingUser[0].email,
          });
        if (newPassUserVerificationExist.length === 0) {
          const newPassVerificationUser = new userNewPasswordVerification({
            userEmail: existingUser[0].email,
            tempPassword: newHasPass,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000,
          });
          await newPassVerificationUser
            .save()
            .then(() => {
              return res
                .status(202)
                .json({ data: { message: "Password successfully updated." } });
            })
            .catch((er) => {
              return res.status(500).json({
                message: "Something when wrong while updating password.",
              });
            });
        } else {
          await userNewPasswordVerification
            .findOneAndUpdate(
              { userEmail: existingUser[0].email },
              { tempPassword: newHasPass }
            )
            .then(() => {
              return res
                .status(202)
                .json({ data: { message: "Password successfully updated." } });
            })
            .catch((er) => {
              return res.status(500).json({
                message: "Something when wrong while updating password.",
              });
            });
        }
      } else {
        return res.status(500).json({
          message:
            "Something went wrong while changing password, please try again.",
        });
      }
    });
  }
};

export const confirmPassword = async (req, res) => {
  const { email, tempPassword } = req.body;
  console.log(email, tempPassword);
  const existingNewPassWordVerification =
    await userNewPasswordVerification.find({ userEmail: email });
  if (existingNewPassWordVerification === 0) {
    return res
      .status(404)
      .json({ message: "User with this email does not exists!" });
  } else {
    const existingUser = await User.find({ email: email });
    if (existingUser.length === 0) {
      return res
        .status(404)
        .json({ message: "User with this email does not exists!" });
    } else {
      const isMatch = await bcrypt.compare(
        tempPassword.toString(),
        existingNewPassWordVerification[0].tempPassword
      );
      if (!isMatch) {
        return res.status(400).json({
          message: "Temporary password is incorrect or it is expired",
        });
      } else {
        await User.findOneAndUpdate(
          { email: email },
          { password: existingNewPassWordVerification[0].tempPassword }
        );
        await existingNewPassWordVerification[0].deleteOne({
          userEmail: email,
        });
        return res
          .status(201)
          .json({ data: { message: "Successfully updated" } });
      }
    }
  }
};

export const changeMyPassword = async (req, res) => {
  const { email, password, newPassword } = req.body;
  console.log(email);
  const existingUser = await User.find({ email: email });
  if (existingUser.length === 0) {
    return res
      .status(404)
      .json({ message: "User with this email does not exists." });
  }

  if (password.length <= 4) {
    return res
      .status(400)
      .send({ message: "Password should be at least 5 characters long." });
  }

  const isMatch = await bcrypt.compare(
    password.toString(),
    existingUser[0].password
  );
  if (!isMatch) {
    return res.status(400).json({ message: "Password is Incorrect" });
  }
  const hasPass = bcrypt.hashSync(
    newPassword.toString(),
    Number(process.env.SALT)
  );
  await User.findOneAndUpdate({ email: email }, { password: hasPass });

  return res.status(202).json({ message: "Password successfully updated." });
};
