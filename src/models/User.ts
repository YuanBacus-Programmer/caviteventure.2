// File: models/User.ts
import mongoose, { Document, Schema, Model, Types } from "mongoose";

// Possible roles
export type UserRole = "user" | "admin" | "superadmin";

// Extend Mongoose's Document interface for your user fields
export interface IUser extends Document {
  _id: Types.ObjectId;       // Explicitly define _id as an ObjectId
  name: string;              // e.g. "John Doe"
  email: string;             // e.g. "john@example.com"
  city: string;              // e.g. "New York"
  gender: "male" | "female"; // or add other options if needed
  hashedPassword: string;    // hashed password stored in the database
  password?: string;         // virtual alias for hashedPassword
  isVerified: boolean;       // email verification status
  verifyCode?: string;       // optional code used for email verification
  profilePicture?: string;   // URL or base64 for user’s avatar
  role: UserRole;            // "user", "admin", or "superadmin"
}

// Define the User schema
const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      unique: true, // Set to false if you don't want names to be unique
    },
    email: {
      type: String,
      required: true,
      unique: true, // Typically emails are unique
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
  },
  {
    timestamps: true, // if you want createdAt / updatedAt fields
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Create a virtual property 'password' to alias hashedPassword
UserSchema.virtual("password")
  .get(function (this: IUser) {
    return this.hashedPassword;
  })
  .set(function (this: IUser, value: string) {
    this.hashedPassword = value;
  });

// Create or reuse the existing User model
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
