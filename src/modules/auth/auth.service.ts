import bcrypt from "bcryptjs";
import { authRepository } from "@/modules/auth/auth.repository.js";
import { SigninRequest, SignupRequest } from "@/modules/auth/auth.types.js";

/**
 * Service layer for authentication-related operations.
 * Handles business logic and interacts with the repository layer.
 * 
 */

export const authService = {

    async signup(signupData: SignupRequest) {
        const existingUser = await authRepository.findByEmail(signupData.emailId);
        if (existingUser) {
            throw new Error('User already exists');
        }

        const password = await bcrypt.hash(signupData.password, 15);
        console.log("password", password);
        signupData.password = password;

        const user = await authRepository.createUser(signupData);
        return user;
    },

    async signin(signinData: SigninRequest) {
        const user = await authRepository.findByEmail(signinData.emailId);
        console.log("user", user);
        if (!user) {
            throw new Error('Invalid email or password');
        }
        const isPasswordMatched = await bcrypt.compare(signinData.password, user.password);
        console.log("isPasswordMatched", isPasswordMatched);
        if (!isPasswordMatched) {
            throw new Error('Invalid email or password');
        }
        return user;
    },
};