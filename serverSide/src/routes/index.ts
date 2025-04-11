// src/routes/index.ts
import { Router } from "express";
import userRoutes from "./v1/userRoutes";
import logger from "../utils/logger";  // Import directly

const router = Router();


// Directly register known routes
router.use("/v1/users", userRoutes);
logger.info("✅ V1 API routes registered: /users");

// You can add additional routes here as needed
// router.use("/v1/posts", postRoutes);

export default router;