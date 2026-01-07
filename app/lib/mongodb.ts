import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

const connectDB = async (): Promise<void> => {
  if (mongoose.connection.readyState === 1) return;

  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection failed", error);
    throw error;
  }
};

export default connectDB;
