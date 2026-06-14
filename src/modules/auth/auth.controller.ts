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
            const result = await authService.signup(req.body);
            res.status(201).send({
                message: 'User created successfully',
                userId: result._id
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
                expires: new Date(Date.now() + 1 * 3600000)
            });
            res.status(200).send({
                message: 'User signed in successfully',
                userId: user._id
            });
        } catch (error: unknown) {
            console.error('Error in signin:', error);
            next(error);
        }
    },


};