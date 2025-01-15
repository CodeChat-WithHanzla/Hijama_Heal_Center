import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import connectDb from "./conf/db.js";

const port = process.env.PORT || 3000;
connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`App is listening at :: ${port}`);
    });
    console.log("Notifications scheduling service has started.");
  })
  .catch((error) => {
    console.log(`Error occur while setting up app :: ${error}`);
  });
