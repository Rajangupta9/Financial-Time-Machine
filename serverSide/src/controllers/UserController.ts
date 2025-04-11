import { Request, Response } from "express";
import User from "../models/UserModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import logger from "../utils/logger";

const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";

// REGISTER
export const registerUser  = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, name });
    await newUser.save();

    logger.info(`✅ Registered new user: ${email}`);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    logger.error("❌ Error in registerUser:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// LOGIN
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    logger.info(`✅ User logged in: ${email}`);
    res.json({ token });
  } catch (error) {
    logger.error("❌ Error in loginUser:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// LOGOUT (token-based, client should just delete token)
export const logoutUser = async (_req: Request, res: Response) => {
  // If you're using cookies:
  // res.clearCookie("token");

  res.status(200).json({ message: "User logged out successfully" });
};

// RESET PASSWORD
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    logger.info(`🔒 Password reset for user: ${email}`);
    res.json({ message: "Password reset successful" });
  } catch (error) {
    logger.error("❌ Error in resetPassword:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// UPDATE PROFILE
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id; // set by auth middleware
    const { name } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name },
      { new: true }
    );

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    logger.info(`📝 Profile updated for user: ${updatedUser.email}`);
    res.json({ message: "Profile updated", user: updatedUser });
  } catch (error) {
    logger.error("❌ Error in updateProfile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
