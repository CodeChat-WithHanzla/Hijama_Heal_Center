import userModel from "../models/user.model.js";
import { validationResult } from "express-validator";
import {
  verifyEmail,
  resendOtp,
  sendVerificationEmail
} from "../conf/emailService.js";
import { v2 as cloudinary } from "cloudinary";
import therapistModel from "../models/therapist.model.js";
import appointmentmodel from "../models/appointment.model.js";

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
      ...(role && { role })
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
        msg: "Email not verified. Please verify your email to proceed."
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
      secure: true
    };
    res
      .status(200)
      .cookie("AccessToken", accessToken, options)
      .cookie("RefreshToken", refreshToken, options)
      .json({ loggedInUser, msg: "LogIn Successfully", accessToken });
  } catch (error) {
    res.status(500).json({
      msg: `Internal Server Error. Please try again later.${error.message}`
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
const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ msg: "User Id needed" });
    const user = await userModel.findById(userId).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ msg: "Something went wrong" });
  }
};
const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;
    if (!name && !phone && !address && !dob && !gender)
      return res.status(400).json({ msg: "No Field to update" });
    const updatedData = {};
    if (name) updatedData.name = name;
    if (phone) updatedData.phone = phone;
    if (address) updatedData.address = JSON.parse(address);
    if (dob) updatedData.dob = dob;
    if (gender) updatedData.gender = gender;
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image"
      });
      const imageUrl = imageUpload.secure_url;
      updatedData.image = imageUrl;
    }
    const user = await userModel.findByIdAndUpdate(userId, updatedData, {
      new: true
    });
    if (!user) return res.status(404).json({ msg: "User not Found" });
    return res.status(200).json({ msg: "Profile updated successfully", user });
  } catch (error) {
    res.status(400).json({ msg: `Something went wrong` });
  }
};
const bookAppointment = async (req, res) => {
  try {
    const { userId, therapistId, slotDate, slotTime } = req.body;
    const therapistData = await therapistModel
      .findById(therapistId)
      .select("-password");
    if (!therapistData)
      return res.status(404).json({ msg: "Therapist not Found!" });
    if (!therapistData.available)
      return res.status(400).json({ msg: "Therapist is not available" });

    let slots_booked = therapistData.slots_booked;
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate]?.includes(slotTime))
        return res.status(400).json({ msg: "Slot already booked" });
      else slots_booked[slotDate].push(slotTime);
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await userModel.findById(userId).select("-password");
    delete therapistData.slots_booked;
    const appointmentData = {
      userId,
      therapistId,
      userData,
      therapistData,
      amount: therapistData.fees,
      slotDate,
      slotTime,
      date: Date.now()
    };
    const newAppointment = new appointmentmodel(appointmentData);
    await newAppointment.save();

    await therapistModel.findByIdAndUpdate(therapistId, { slots_booked });
    res.status(201).json({ newAppointment, msg: "Appointment Booked" });
  } catch (error) {
    res.status(400).json({ msg: `Something went wrong` });
  }
};
const getAllAppointment = async (req, res) => {
  try {
    const { userId } = req.body;
    const appointments = await appointmentmodel.find({ userId });
    res.status(200).json({ appointments });
  } catch (error) {
    res.status(400).json({ msg: `Something went wrong` });
  }
};
const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;
    const appointmentData = await appointmentmodel.findById(appointmentId);
    if (!appointmentData)
      return res.status(404).json({ msg: "Appointment not found" });
    if (appointmentData.userId !== userId)
      return res
        .status(400)
        .json({ msg: "You are not authorized to cancel this appointment" });
    await appointmentmodel.findByIdAndUpdate(appointmentId, {
      cancelled: true
    });
    const { therapistId, slotDate, slotTime } = appointmentData;
    const therapistData = await therapistModel.findById(therapistId);
    let slots_booked = therapistData.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );
    await therapistModel.findByIdAndUpdate(therapistId, { slots_booked });
    res.status(200).json({ msg: "Appointment Cancelled" });
  } catch (error) {
    res.status(400).json({ msg: `Something went wrong` });
  }
};
export {
  registerUser,
  loginUser,
  logoutUser,
  verifyEmail,
  resendOtp,
  getProfile,
  updateProfile,
  bookAppointment,
  getAllAppointment,
  cancelAppointment
};
