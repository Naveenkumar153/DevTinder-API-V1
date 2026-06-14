import bcrypt from "bcryptjs";
import { ConflictResourceError } from "@/classes/errors.js";
import { jwtService } from "@/shared/utils/jwt.js";
import { authConfig } from "@/config/auth.config.js";
import { SigninRequest, SignupRequest } from "@/modules/auth/auth.types.js";
import { authRepository } from "@/modules/auth/auth.index.js";

/**
 * Service layer for authentication-related operations.
 * Handles business logic and interacts with the repository layer.
 * 
 */

export const authService = {

    async signup(signupData: SignupRequest) {
        const existingUser = await authRepository.findByEmail(signupData.emailId);
        if (existingUser) {
            throw new ConflictResourceError('User already exists');
        }

        const password = await bcrypt.hash(signupData.password, 15);
        signupData.password = password;

        const user = await authRepository.createUser(signupData);
        return user;
    },

    async signin(signinData: SigninRequest) {
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
        const token = await jwtService.sign(idStr, authConfig.jwt.secret, {
            algorithm: authConfig.jwt.algorithm,
            expiresIn: authConfig.jwt.expiresIn
        });

        return { user, token };
    },
};