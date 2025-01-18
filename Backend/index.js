import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import connectDb from "./conf/db.js";
import cors from "cors";
import connectCloudinary from "./conf/cloudinary.js";
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
app.use(cors({ origin: frontendUrl, credentials: true }));
const port = process.env.PORT || 3000;
connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`App is listening at :: ${port}`);
    });
    connectCloudinary();
  })
  .catch((error) => {
    console.log(`Error occur while setting up app :: ${error}`);
  });
