import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    city: { type: String },
    gender: { type: String, enum: ["male", "female"] },
    hashedPassword: { type: String },
    isVerified: { type: Boolean, default: false },
    verifyCode: { type: String },  // 6-digit code
  },
  { timestamps: true }
);

const User = models.User || model("User", userSchema);
export default User;
