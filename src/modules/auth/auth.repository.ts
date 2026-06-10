import User, { IUser } from "@/modules/auth/auth.model.js";
import { SignupRequest } from "@/modules/auth/auth.types.js";
import { Document } from "mongoose";

/**
 * Repository layer for authentication-related database operations.
 * Interacts directly with the database models.
 */

export const authRepository = {
    findByEmail(email: string): Promise<IUser | null> {
        return User.findOne({ emailId: email }).exec() as Promise<IUser | null>;
    },

    createUser(data: SignupRequest): Promise<IUser & Document> {
        const user = new User(data);
        return user.save() as unknown as Promise<IUser & Document>;
    },
};