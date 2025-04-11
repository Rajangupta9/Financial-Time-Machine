import app from "./app";
import dotenv from "dotenv";
import logger from "./utils/logger";
import { connectDataBase } from "./config/database";

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 4000;

// Start the server
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  connectDataBase();
});

// Handle unhandled rejections
process.on("unhandledRejection", (err: Error) => {
  logger.error("Unhandled Rejection:", err);
  process.exit(1);
});
