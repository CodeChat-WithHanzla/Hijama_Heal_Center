import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import adminRouter from "./routes/admin.routes.js";
import upload from "./middlewares/multer.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/auth", userRouter);
app.use("/admin", upload.single("image"), adminRouter);
export default app;
