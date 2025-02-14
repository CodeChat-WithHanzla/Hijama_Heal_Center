import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import connectDb from "./conf/db.js";
import connectCloudinary from "./conf/cloudinary.js";
import createMessage from "./conf/whatsAppService.js";
const port = process.env.PORT || 3000;
connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`App is listening at :: ${port}`);
    });
    connectCloudinary();
    // createMessage("923256859064", "My boss , Saleh Ahmed bhai ");
  })
  .catch((error) => {
    console.log(`Error occur while setting up app :: ${error}`);
  });
