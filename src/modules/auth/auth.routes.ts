import { authController } from "@/modules/auth/auth.controller.js";
import { authValidation } from "@/modules/auth/auth.validation.js";
import { Router } from "express";

const router = Router();

/**
 * Routes for authentication-related endpoints.
 * Maps HTTP requests to controller functions.
 * Each route corresponds to a specific authentication action.
 */

router.post('/signup', authValidation.signup, authController.signup)
    .post('/signin', authValidation.signin, authController.signin)
    .post('/logout', authController.logout)
    .post('/forgotPassword', authValidation.checkEmail, authController.forgotPassword)
    .post('/resetPassword', authController.resetPassword);

export { router as authRoutes };