import mongoose, { Document, Schema, Model, Types } from "mongoose";

export type UserRole = "user" | "admin" | "superadmin";

// Extend Mongoose's Document interface to add fields for your user
export interface IUser extends Document {
  _id: Types.ObjectId;              // Explicitly define _id as an ObjectId
  name: string;
  email: string;
  city: string;
  gender: "male" | "female";
  hashedPassword: string;
  isVerified: boolean;
  verifyCode?: string;
  profilePicture?: string;
  role: UserRole;
}

// Define the User schema
const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  city: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verifyCode: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin", "superadmin"],
    default: "user",
    required: true,
  },
});

// Create the User model or reuse the existing one if it's already declared
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
