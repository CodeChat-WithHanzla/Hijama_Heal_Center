import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  verifyEmail,
  resendOtp,
  getProfile,
  updateProfile,
  bookAppointment,
  getAllAppointment,
  cancelAppointment,
  createPayment
} from "../controllers/userController.js";
import { body } from "express-validator";
import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";
const router = Router();

router.post(
  "/register",
  [
    body("name")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long."),
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be 6 characters long"),
    body("phone")
      .matches(/^(03[0-9]{9}|(0[1-9][0-9]{1,2})[0-9]{7})$/)
      .withMessage(
        "Please enter a valid Pakistani phone number (e.g., 03123456789 or 0421234567)"
      )
  ],
  registerUser
);
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be 6 characters long")
  ],
  loginUser
);
router.post("/logout", logoutUser);
router.post("/verifyEmail", verifyEmail);
router.post("/resendOtp", resendOtp);
router.get("/get-profile", authUser, getProfile);
router.put("/update-user", upload.single("image"), authUser, updateProfile);
router.post("/book-appointment", authUser, bookAppointment);
router.get("/get-appointments", authUser, getAllAppointment);
router.post("/cancel-appointment", authUser, cancelAppointment);

router.post("/payment", authUser, createPayment);
export default router;
