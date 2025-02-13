import { Router } from "express";
import {
  addTherapist,
  allTherapists,
  loginAdmin,
  allAppointments,
  cancelAppointment,
  adminDashboard,
  getFeedbacks
} from "../controllers/adminController.js";
import { changeAvailability } from "../controllers/therapistController.js";
import { body } from "express-validator";
import authAdmin from "../middlewares/authAdmin.js";

const adminRouter = Router();
adminRouter.post(
  "/addTherapist",
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
  authAdmin,
  addTherapist
);
adminRouter.post("/login", loginAdmin);
adminRouter.get("/all-therapist", authAdmin, allTherapists);
adminRouter.put("/changeAvailability", authAdmin, changeAvailability);
adminRouter.get("/all-appointments", authAdmin, allAppointments);
adminRouter.put("/cancel-appointments", authAdmin, cancelAppointment);
adminRouter.get("/dashboard", authAdmin, adminDashboard);


adminRouter.get("/feedback", authAdmin, getFeedbacks);
export default adminRouter;
