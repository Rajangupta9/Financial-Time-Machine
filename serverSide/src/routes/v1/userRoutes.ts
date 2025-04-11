import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  resetPassword,
  updateProfile,
} from "../../controllers/UserController";

import { authenticate } from "../../routes/middleware/auth.middleware";

const userRoutes = Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);
userRoutes.post("/logout", logoutUser);
userRoutes.post("/reset-password", resetPassword);
userRoutes.put("/profile", authenticate, updateProfile);

export default userRoutes;
