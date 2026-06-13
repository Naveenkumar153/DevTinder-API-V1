import { SigninRequest, SignupRequest } from '@/modules/auth/auth.types.js';
import { NextFunction, Request, Response } from 'express';
import validator from 'validator';


export const authValidation = {
    signup(req: Request, res: Response, next: NextFunction) {
        try {
            const { firstName, lastName, emailId, password } = req.body as SignupRequest;
            if (!firstName || !lastName || !emailId || !password) {
                return res.status(400).send({
                    message: 'Missing required fields'
                });
            }

            if (firstName.length > 50 || lastName.length > 50 || emailId.length > 50) {
                return res.status(400).send({
                    message: 'Fields must be less than 50 characters'
                });
            };

            if (password.length > 100) {
                return res.status(400).send({
                    message: 'Password must be less than 100 characters'
                });
            }

            if (!validator.isStrongPassword(password)) {
                return res.status(400).send({
                    message: 'Password must be at least 8 char long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
                });
            }

            if (!validator.isEmail(req.body.emailId)) {
                return res.status(400).send({
                    message: 'Invalid email address'
                });
            }
            next();
        } catch (error: unknown) {
            console.error('Error in authValidation.signup:', error);
            next(error);
        }
    },

    async signin(req: Request, res: Response, next: NextFunction) {
        try {
            const { emailId, password } = req.body as SigninRequest;
            if (!emailId || !password) {
                return res.status(400).send({
                    message: 'Missing required fields'
                });
            }

            if (emailId.length > 50 || password.length > 100) {
                return res.status(400).send({
                    message: 'Fields must be less than 100 characters'
                });
            };

            if (!validator.isEmail(req.body.emailId)) {
                return res.status(400).send({
                    message: 'Invalid email address'
                });
            }
            next();
        } catch (error: unknown) {
            console.error('Error in authValidation.signup:', error);
            next(error);
        }
    }
};