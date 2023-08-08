import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userOTPVerification } from "../models/userOTPVerification.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ecommercemailer7@gmail.com",
    pass: "vcuxfsqqxoimhrku",
  },
  tls: { rejectUnauthorized: false },
});

export const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });
};

export const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies["access_token"];

    if (!token) {
      return res.status(400).json({ msg: "Invalid Authorisation" });
    }
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (err) {
        return res.status(400).json({ msg: "Invalid Authorisation" });
      }
      req.user = decoded;
      return next();
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Something went wrong, please try again later." });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({
      message: "Invalid Admin Token. You need admin permission to do that!",
    });
  }
};

export const sentOTPVerificationEmail = async (req, res) => {
  try {
    const otp = Math.floor(10000 + Math.random() * 90000);
    const hasherOTP = await bcrypt.hash(
      otp.toString(),
      Number(process.env.SALT)
    );
    const newOTPVerification = await new userOTPVerification({
      userId: req._id,
      otp: hasherOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });
    await newOTPVerification.save();
    let mailOptions = {
      from: "ecommercemailer7@gmail.com",
      to: req.email,
      subject: "Email Verification",
      html: `<p>This is your OTP number verification to verify your account: <b>${otp}</b></p><p>Please notice that it will expire in 1 hour!</p><br/><p>Thank you for shopping with us :)</p>`,
      // text: "jdjdko sjjs",
    };
    await transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        throw new Error("Something went wrong");
      } else {
        return info.response;
      }
    });
  } catch (error) {
    console.log("myyy errror", error);
  }
};
