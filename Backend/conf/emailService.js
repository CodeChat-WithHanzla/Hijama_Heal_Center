import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";
export const sendVerificationEmail = async (email, verificationCode) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification Code",
      text: `Your verification code is: ${verificationCode}`,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message };
  }
};
export const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ msg: "Email and OTP are required." });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }
    if (!user.emailVerificationCode) {
        return res.status(400).json({ msg: "OTP has expired or is invalid." });
    }
      
    const isOtpValid = await bcrypt.compare(otp, user.emailVerificationCode);
    if (!isOtpValid) {
      return res.status(400).json({ user, msg: "Invalid OTP." });
    }

    user.isEmailVerified = true;
    user.emailVerificationCode = undefined;
    await user.save();

    res.status(200).json({ msg: "Email verified successfully!" });
  } catch (error) {
    console.error("Error during email verification:", error);
    res
      .status(500)
      .json({ msg: `Error during email verification. ${error.message}` });
  }
};
export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ msg: "Email is required." });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }
    const otp = `${Math.floor(100000 + Math.random() * 900000)}`;
    const hashedOtp = await userModel.hashOtp(otp);
    user.emailVerificationCode = hashedOtp;
    await user.save();

    const verification = await sendVerificationEmail(email, otp);
    if (!verification.success) {
      return res.status(500).json({ msg: "Error sending verification email." });
    }

    res.status(200).json({ msg: "New OTP has been sent to your email." });
  } catch (error) {
    console.error("Error during OTP resend:", error);
    res.status(500).json({ msg: `Error during OTP resend. ${error.message}` });
  }
};
