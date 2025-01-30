import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import adminRouter from "./routes/admin.routes.js";
import upload from "./middlewares/multer.js";
import therapistRouter from "./routes/therapist.routes.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const allowedOrigins = [process.env.FRONTEND_URL, process.env.FRONTEND_URL2];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// Routes
app.use("/user", userRouter);
app.use("/admin", upload.single("image"), adminRouter);
app.use("/list", therapistRouter);
export default app;
