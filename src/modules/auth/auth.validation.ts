import { BadRequestError, ValidationError } from '@/classes/errors.js';
import { SigninRequest, SignupRequest } from '@/modules/auth/auth.types.js';
import { NextFunction, Request, Response } from 'express';
import validator from 'validator';


export const authValidation = {
    signup(req: Request, res: Response, next: NextFunction) {
        try {
            const { firstName, lastName, emailId, password } = req.body as SignupRequest;
            if (!firstName || !lastName || !emailId || !password) {
                throw new BadRequestError('Missing required fields');
            }

            if (firstName.length > 50 || lastName.length > 50 || emailId.length > 50) {
                throw new ValidationError('Fields must be less than 50 characters');
            };

            if (password.length > 100) {
                throw new ValidationError('Password must be less than 100 characters');
            }

            if (!validator.isStrongPassword(password)) {
                throw new ValidationError('Password must be at least 8 char long and contain at least one uppercase letter, one lowercase letter, one number, and one special character');
            }

            if (!validator.isEmail(req.body.emailId)) {
                throw new ValidationError('Invalid email address');
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
                throw new BadRequestError('Missing required fields');
            }

            if (emailId.length > 50 || password.length > 100) {
                throw new ValidationError('Fields must be less than 100 characters');
            };

            if (!validator.isEmail(req.body.emailId)) {
                throw new ValidationError('Invalid email address');
            }
            next();
        } catch (error: unknown) {
            console.error('Error in authValidation.signup:', error);
            next(error);
        }
    }
};