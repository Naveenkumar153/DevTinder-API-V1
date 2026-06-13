import { Request, Response, NextFunction } from "express";
import { jwtService } from "@/utils/jwt.js";
import { UnauthorizedError } from "@/classes/errors.js";

/**
 * Extend Express Request interface to include user data
 * This allows TypeScript to recognize req.user and req.id properties
 */
declare global {
    namespace Express {
        interface Request {
            id: string;
            user?: {
                id: string;
                [key: string]: any;
            };
        }
    }
}

/**
 * JWT Authentication Middleware
 * Validates token expiration WITHOUT database calls
 * Token automatically validated by JWT library for:
 * - Signature validity
 * - Expiration time (iat, exp)
 * - Token format
 */
export const authMiddleware = {
    async checkToken(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const cookie = req.cookies;

            // Check if token exists
            if (!cookie.token) {
                throw new UnauthorizedError('No token provided. Please login first.');
            }

            // Verify token and check expiration
            // JWT library automatically validates:
            // - Signature (tamper detection)
            // - Expiration time (exp claim)
            // - Not Before time (nbf claim)
            let decoded: any;
            try {
                decoded = jwtService.verify(cookie.token, 'DevTinder@2026');
            } catch (error: any) {
                if (error.name === 'TokenExpiredError') {
                    throw new UnauthorizedError('Token has expired. Please login again.');
                }
                if (error.name === 'JsonWebTokenError') {
                    throw new UnauthorizedError('Invalid token. Please login again.');
                }
                throw new UnauthorizedError('Token verification failed.');
            }

            // Attach decoded token data to request
            // Now accessible as req.id or req.user.id without casting
            req.id = decoded.id;
            req.user = {
                id: decoded.id,
                ...decoded
            };
            next();
        } catch (error) {
            console.error('authMiddleware error:', error);
            next(error);
        }
    },
};