import mongoose from "mongoose";

const MONGO_URI: string | undefined = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in environment variables");
}

const connectDB = async (): Promise<void> => {
  if (mongoose.connection.readyState === 1) return;

  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error: unknown) {
    console.error("MongoDB connection failed", error);
    throw error;
  }
};

export default connectDB;
