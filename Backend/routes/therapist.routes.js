import {
  allTherapists,
  loginTherapists,
  therapistAppointments,
  appointmentComplete,
  appointmentCancel
} from "../controllers/therapistController.js";
import authTherapist from "../middlewares/authTherapist.js";
import { Router } from "express";
const router = Router();
router.get("/allTherapists", allTherapists);
router.post("/login", loginTherapists);
router.get("/appointments", authTherapist, therapistAppointments);
router.put("/complete-appointment", authTherapist, appointmentComplete);
router.put("/cancel-appointment", authTherapist, appointmentCancel);
export default router;
