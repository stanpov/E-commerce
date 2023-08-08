import mongoose from "mongoose";

const userOTPVerificationSchema = new mongoose.Schema({
  userId: { type: String, require: true },
  otp: { type: String, require: true },
  createdAt: { type: Date, require: true },
  expiresAt: { type: Date, require: true },
});

export const userOTPVerification = mongoose.model(
  "UserOTPVerification",
  userOTPVerificationSchema
);
