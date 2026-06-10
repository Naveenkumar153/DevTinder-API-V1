import { authRepository } from "@/modules/auth/auth.repository.js";
import { SignupRequest } from "@/modules/auth/auth.types.js";

/**
 * Service layer for authentication-related operations.
 * Handles business logic and interacts with the repository layer.
 * 
 */

export const authService = {
    async signup(signupData: SignupRequest) {
        // const existingUser = await authRepository.findByEmail(signupData.emailId);
        // if (existingUser) {
        //     throw new Error('User already exists');
        // }
        const user = await authRepository.createUser(signupData);
        return user;
    },
};