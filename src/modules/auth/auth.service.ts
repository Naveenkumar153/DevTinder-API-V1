import bcrypt from "bcryptjs";
import { ConflictResourceError } from "@/classes/errors.js";
import { jwtService } from "@/shared/utils/jwt.js";
import { SigninRequest, SignupRequest } from "@/modules/auth/auth.types.js";
import { authRepository } from "@/modules/auth/auth.index.js";
import { IUser } from "@/shared/models/user.model.js";

/**
 * Service layer for authentication-related operations.
 * Handles business logic and interacts with the repository layer.
 *
 */

type SafeUser = Omit<IUser, 'password' | 'createdAt' | 'updatedAt' | '__v'>;

function toSafeUser(user: IUser): SafeUser {
    const { password, createdAt, updatedAt, __v, ...safeUser } = user.toObject();
    return safeUser;
}

export const authService = {

    async signup(signupData: SignupRequest): Promise<{ user: SafeUser, token: string }> {
        const existingUser = await authRepository.findByEmail(signupData.emailId);
        if (existingUser) {
            throw new ConflictResourceError('User already exists');
        }

        const password = await bcrypt.hash(signupData.password, 15);
        signupData.password = password;

        const user = await authRepository.createUser(signupData);

        // Generate JWT token
        const idStr = user._id.toString();
        const token = await jwtService.generateToken(idStr);
        return { user: toSafeUser(user), token };
    },

    async signin(signinData: SigninRequest): Promise<{ user: SafeUser, token: string }> {
        const user = await authRepository.findByEmail(signinData.emailId);
        if (!user) {
            throw new ConflictResourceError('Invalid email or password');
        }
        const isPasswordMatched = await bcrypt.compare(signinData.password, user.password);
        if (!isPasswordMatched) {
            throw new ConflictResourceError('Invalid email or password');
        }

        // Generate JWT token
        const idStr = user._id.toString();
        const token = await jwtService.generateToken(idStr);
        return { user: toSafeUser(user), token };
    },

    async forgotPassword(emailId: string): Promise<IUser> {
        const userInfo = await authRepository.forgotPassword(emailId);
        return userInfo as IUser;
    },

    async resetPassword(token: string, password: string) {

    }
};