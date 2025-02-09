import therapistModel from "../models/therapist.model.js";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import appointmentmodel from "../models/appointment.model.js";
import userModel from "../models/user.model.js";

export const addTherapist = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
      available
    } = req.body;
    const image = req.file;
    if (
      (!name,
      !email,
      !password,
      !speciality,
      !experience,
      !about,
      !fees,
      !address)
    ) {
      return res.status(400).json({ message: "Missing Details" });
    }
    const hashPassword = await therapistModel.hashPasswords(password);
    let imageUpload = "";
    let imageUrl = "";
    if (image) {
      imageUpload = await cloudinary.uploader.upload(image.path, {
        resource_type: "image"
      });
      imageUrl = imageUpload.secure_url;
    }
    const therapistData = {
      name,
      email,
      password: hashPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now()
    };
    if (image) therapistData.image = imageUrl;
    if (available) therapistData.available = available;
    const newTherapist = await therapistModel.create(therapistData);
    res.status(201).json({ message: "Therapist added", newTherapist });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email == process.env.ADMIN_EMAIL &&
      password == process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.header("Authorization", `Bearer ${token}`);
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: "Unauthorized access" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};
export const allTherapists = async (req, res) => {
  try {
    const therapists = await therapistModel.find().select("-password");
    res.status(200).json({ therapists });
  } catch (error) {
    res.status(500).json({
      message: `An error occurred while fetching therapists. ${error.message}`
    });
  }
};
export const allAppointments = async (req, res) => {
  try {
    const appointments = await appointmentmodel.find({});
    res.status(200).json({ appointments });
  } catch (error) {
    res.status(500).json({
      message: `An error occurred while fetching appointments. ${error.message}`
    });
  }
};
export const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentmodel.findById(appointmentId);
    if (!appointmentData)
      return res.status(404).json({ msg: "Appointment not found" });

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
export const adminDashboard = async (req, res) => {
  try {
    const therapists = await therapistModel.find({});
    const users = await userModel.find({});
    const appointments = await appointmentmodel.find({});
    const dashBoardData = {
      therapists: therapists.length,
      patients: users.length,
      appointments: appointments.length,
      lastestAppointments: appointments.reverse().splice(0, 5)
    };
    res.status(200).json({ dashBoardData });
  } catch (error) {
    res.status(400).json({ msg: `Something went wrong` });
  }
};
