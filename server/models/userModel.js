import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, unique: true, require: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  verified: { type: Boolean, default: false },
  userImage: { type: String, required: false },
  phoneNumber: { type: Number, required: false },
  deliveryAddress: { type: String, required: false },
  lastReviewed: [{ type: mongoose.Schema.Types.ObjectId, ref: "Products" }],
});

const User = mongoose.model("User", userSchema);
export default User;
