import { UnauthorizedError } from "@/classes/errors.js";
import { authService } from "@/modules/auth/auth.index.js";
import { Request, Response, NextFunction } from "express";

/**
 * Controller layer for authentication-related endpoints.
 * Handles incoming HTTP requests and sends responses.
 * Delegates business logic to the service layer.
 */

export const authController = {
    async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { user, token } = await authService.signup(req.body);
            res.cookie('token', token, {
                httpOnly: true,
                expires: new Date(Date.now() + 1 * 3600000) // 1 hour
            });
            res.status(201).send({
                message: 'User created successfully',
                user,
            });
        } catch (error: unknown) {
            console.error('Error in signup:', error);
            next(error);
        }
    },

    async signin(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { user, token } = await authService.signin(req.body);
            res.cookie('token', token, {
                httpOnly: true,
                expires: new Date(Date.now() + 1 * 3600000) // 1 hour
            });
            res.status(200).send({
                message: 'User signed in successfully',
                user,
            });
        } catch (error: unknown) {
            console.error('Error in signin:', error);
            next(error);
        }
    },

    async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            res.clearCookie('token', { httpOnly: true, expires: new Date(Date.now()) })
                .status(200).send({
                    message: 'User logged out successfully'
                });
        } catch (error: unknown) {
            console.error('Error in logout:', error);
            next(error);
        }
    },

    async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const emailId = req.body.emailId;
            const userInfo = await authService.forgotPassword(emailId);
            res.status(200).json({
                id: userInfo.emailId,
                messsage: 'Email Found'
            });
        } catch (error) {
            console.error("Error in forgetPassword", error);
            next(error);
        }
    },


    async resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {


        } catch (error) {
            console.error("Error in checkEmailId", error);
            next(error);
        }
    },



};