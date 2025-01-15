import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  verifyEmail,
  resendOtp,
} from "../controllers/authController.js";
import { body } from "express-validator";
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
      ),
  ],
  registerUser
);
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be 6 characters long"),
  ],
  loginUser
);
router.post("/logout", logoutUser);
router.post("/verifyEmail", verifyEmail);
router.post("/resendOtp", resendOtp);
export default router;
