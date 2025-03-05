import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to MongoDB Compass ${conn.connection.host}`);
  } catch (err) {
    console.error("Error connecting to MongoDB Compass:", err.message);
    process.exit(1);
  }
};

export default connectDB;
