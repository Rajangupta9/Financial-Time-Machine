// src/controllers/UserController.ts
import { Request, Response } from "express";
import User from "../models/UserModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import logger from "../utils/logger";
import crypto from "crypto";
import emailService from "../services/auth/emailService";

const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";

// REGISTER
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
     logger.info("registerUser", email, password, name);
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
  res.status(200).json({ message: "User logged out successfully" });
};

// FORGOT PASSWORD - Request password reset
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      // For security reasons, we'll still return 200 even if user not found
      // This prevents email enumeration attacks
      return res.status(200).json({
        message: "If a user with that email exists, a password reset link has been sent"
      });
    }

    // Generate a random token
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Hash the token (to store in DB)
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Save the hashed token to the user and set expiry (1 hour)
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
    await user.save();

    // Send the email with the plain token
    const emailSent = await emailService.sendPasswordResetEmail(email, resetToken);

    if (!emailSent) {
      return res.status(500).json({ message: "Failed to send password reset email" });
    }

    logger.info(`✅ Password reset email sent to: ${email}`);
    res.status(200).json({
      message: "If a user with that email exists, a password reset link has been sent"
    });
  } catch (error) {
    logger.error("❌ Error in forgotPassword:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// RESET PASSWORD - Process the reset with token
export const resetPasswordWithToken = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;

    // Hash the received token for comparison with stored hash
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Find the user by token and check if token is still valid
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password and remove reset token fields
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    logger.info(`✅ Password successfully reset for user: ${user.email}`);
    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (error) {
    logger.error("❌ Error in resetPasswordWithToken:", error);
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