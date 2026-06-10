import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    emailId: string;
    password: string;
    age?: number;
    gender?: string;
    bio?: string;
    profilePicture?: string;
    createdAt: Date;
    updatedAt: Date;
};

const userSchema : mongoose.Schema = new mongoose.Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    emailId: { type: String },
    password: { type: String, required: true },
    age: { type: Number },
    gender: { type: String },
    bio: { type: String },
    profilePicture: { type: String },
 }, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;