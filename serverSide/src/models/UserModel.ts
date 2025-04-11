// First, let's add the necessary fields to the User model
// src/models/UserModel.ts

import mongoose, { Schema } from "mongoose";
import { IUser } from "./interfaces/UserInterface";

const UserSchema: Schema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
        },
        // Add these fields for password reset functionality
        resetPasswordToken: {
            type: String,
        },
        resetPasswordExpires: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model<IUser>("User", UserSchema);

export default User;