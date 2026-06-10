import { authController } from "@/modules/auth/auth.controller.js";
import { Router } from "express";

const router = Router();

/**
 * Routes for authentication-related endpoints.
 * Maps HTTP requests to controller functions.
 * Each route corresponds to a specific authentication action.
 */

router.post('/signup', authController.signup);
// router.post('/signin', authController.signin);
// router.post('/forgotpassword', authController.forgotPassword);

export { router as authRoutes };