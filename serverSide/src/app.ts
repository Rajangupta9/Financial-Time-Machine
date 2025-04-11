import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import routes from "./routes";
import { setupSwagger } from "./config/swagger";
// import { errorHandler } from './utils/errors/errorHandler';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));


// Setup Swagger documentation
setupSwagger(app);
// All routes are now handled by the routes index
app.use("/api", routes);

// Error handling
// app.use(errorHandler);

export default app;
