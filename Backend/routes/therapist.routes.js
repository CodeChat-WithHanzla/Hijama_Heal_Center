import { allTherapists } from "../controllers/therapistController.js";
import { Router } from "express";
const router = Router();
router.get("/allTherapists", allTherapists);
export default router;
