import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "../utils/logger"; // Adjust path based on your structure

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in environment variables");
}

const connectDataBase = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);
    logger.info("✅ Connected to MongoDB");
  } catch (err) {
    logger.error("❌ MongoDB connection error:", err);
  }
};

export { connectDataBase };
