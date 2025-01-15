import userModel from "../models/user.model.js";
import { validationResult } from "express-validator";
import {
  verifyEmail,
  resendOtp,
  sendVerificationEmail,
} from "../conf/emailService.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await userModel.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    res
      .status(400)
      .json({ msg: "Error occur while generating access or refresh token ." });
  }
};
const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role, phone } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already exists." });
    }

    const hashedPassword = await userModel.hashPasswords(password);

    const user = await userModel.create({
      name,
      email,
      phone,
      password: hashedPassword,
      ...(role && { role }),
    });

    const otp = `${Math.floor(100000 + Math.random() * 900000)}`;
    const hashedOtp = await userModel.hashOtp(otp);
    user.emailVerificationCode = hashedOtp;
    await user.save();

    const verification = await sendVerificationEmail(email, otp);
    if (!verification.success) {
      return res.status(500).json({ msg: "Error sending verification email." });
    }

    res
      .status(200)
      .json({ msg: "User registered successfully. Please verify your email." });
  } catch (error) {
    res
      .status(500)
      .json({ msg: `Error during registration. ${error.message}` });
  }
};

const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(404)
        .json({ msg: "User with this email does not exist." });
    }
    if (!user.isEmailVerified) {
      return res.status(403).json({
        msg: "Email not verified. Please verify your email to proceed.",
      });
    }
    const isMatch = await user.isPasswordCorrect(password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials." });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );
    const loggedInUser = await userModel.findById(user._id);
    const options = {
      httpOnly: true,
      secure: true,
    };
    res
      .status(200)
      .cookie("AccessToken", accessToken, options)
      .cookie("RefreshToken", refreshToken, options)
      .json({ loggedInUser, msg: "LogIn Successfully" });
  } catch (error) {
    res.status(500).json({
      msg: `Internal Server Error. Please try again later.${error.message}`,
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    if (!req.cookies?.AccessToken && !req.cookies?.RefreshToken) {
      return res
        .status(204)
        .json({ msg: "No active session to sign out from" });
    }

    res.clearCookie("AccessToken", { httpOnly: true });
    res.clearCookie("RefreshToken", { httpOnly: true });
    return res.status(200).json({ msg: "Successfully signed out" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal Server Error. Please try again later." });
  }
};
export { registerUser, loginUser, logoutUser, verifyEmail, resendOtp };
