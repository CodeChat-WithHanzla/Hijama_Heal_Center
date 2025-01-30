import therapistModel from "../models/therapist.model.js";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
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
      available,
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
        resource_type: "image",
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
      date: Date.now(),
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
    res
      .status(500)
      .json({
        message: `An error occurred while fetching therapists. ${error.message}`,
      });
  }
};
