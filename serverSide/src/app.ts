import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import userRoutes from "./routes/v1/userRoutes";
// import { errorHandler } from './utils/errors/errorHandler';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));

// Routes
app.use("/api/users", userRoutes);

// Error handling
// app.use(errorHandler);

export default app;
