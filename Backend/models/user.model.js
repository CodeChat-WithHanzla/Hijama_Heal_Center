import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      select: false,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      match: [
        /^(03[0-9]{9}|(0[1-9][0-9]{1,2})[0-9]{7})$/,
        "Please enter a valid Pakistani phone number (e.g., 03123456789 or 0421234567)",
      ],
    },
    refreshToken: {
      type: String,
      select: false,
      default: "",
    },
    emailVerificationCode: {
      type: String,
      default: undefined,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
userSchema.methods.isPasswordCorrect = function (password) {
  return bcrypt.compare(password, this.password);
};
userSchema.statics.hashPasswords = async function (password) {
  return await bcrypt.hash(password, 10);
};
userSchema.statics.hashOtp = async function (opt) {
  return await bcrypt.hash(opt, 10);
};
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      role: this.role,
    },
    process.env.ACCESS_PRIVATE_KEY,
    {
      expiresIn: process.env.ACCESS_PRIVATE_KEY_Expires,
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_PRIVATE_KEY,
    {
      expiresIn: process.env.REFRESH_PRIVATE_KEY_Expires,
    }
  );
};
const User = model("User", userSchema);
export default User;
