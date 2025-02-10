import {
  allTherapists,
  loginTherapists,
  therapistAppointments,
  appointmentComplete,
  appointmentCancel,
  therapistDashboard,
  therapistProfile,
  updateTherapistProfile
} from "../controllers/therapistController.js";
import authTherapist from "../middlewares/authTherapist.js";
import { Router } from "express";
const router = Router();
router.get("/allTherapists", allTherapists);
router.post("/login", loginTherapists);
router.get("/appointments", authTherapist, therapistAppointments);
router.put("/complete-appointment", authTherapist, appointmentComplete);
router.put("/cancel-appointment", authTherapist, appointmentCancel);
router.get("/dashboard", authTherapist, therapistDashboard);
router.get("/profile", authTherapist, therapistProfile);
router.put("/update-profile", authTherapist, updateTherapistProfile);
export default router;
