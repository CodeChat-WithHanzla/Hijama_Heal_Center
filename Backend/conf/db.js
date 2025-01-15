import mongoose from "mongoose";
const connectDb = async () => {
  try {
    const dbConnect = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
    );
    console.log(`MongoDB connected Successfully ${dbConnect.connection.host}`);
  } catch (error) {
    console.log(`Error :: ${error} `);
  }
};
export default connectDb;