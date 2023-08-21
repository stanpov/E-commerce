import mongoose from "mongoose";

const userOTPVerificationSchema = new mongoose.Schema({
  userId: { type: String, require: true },
  otp: { type: String, require: true },
  createdAt: { type: Number, require: true },
  expiresAt: { type: Number, require: true },
});

export const userOTPVerification = mongoose.model(
  "UserOTPVerification",
  userOTPVerificationSchema
);
