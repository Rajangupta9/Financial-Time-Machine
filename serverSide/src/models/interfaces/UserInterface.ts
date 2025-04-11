// src/models/interfaces/UserInterface.ts
import { Document } from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the user
 *         email:
 *           type: string
 *           format: email
 *           description: The user's email address
 *         password:
 *           type: string
 *           description: The user's hashed password
 *         name:
 *           type: string
 *           description: The user's full name
 *         resetPasswordToken:
 *           type: string
 *           description: Token for password reset
 *         resetPasswordExpires:
 *           type: string
 *           format: date-time
 *           description: Expiration time for password reset token
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the user was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the user was last updated
 */
export interface IUser extends Document {
  email: string;
  password: string;
  name?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}