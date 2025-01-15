import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";

const app = express();
const frontendUrl = process.env.FRONTEND_URL;
app.use(cors({ origin: frontendUrl }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/auth", userRouter);
export default app;
