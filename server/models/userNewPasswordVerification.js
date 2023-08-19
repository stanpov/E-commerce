import mongoose from "mongoose";

const userNewPasswordVerificationSchema = new mongoose.Schema({
  userEmail: { type: String, require: true },
  tempPassword: { type: String, require: true },
  createdAt: { type: Number, require: true },
  expiresAt: { type: Number, require: true },
});

export const userNewPasswordVerification = mongoose.model(
  "userNewPasswordVerifications",
  userNewPasswordVerificationSchema
);
