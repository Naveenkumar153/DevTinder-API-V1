import { AppError } from "@/classes/errors.js";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    if (err instanceof AppError) {
        console.error('Error:', err.message, err.statusCode);
        res.status(err.statusCode).json({
            statusCode: err.statusCode,
            message: err.message,
            success: false,
        });
    } else {
        console.error('Unknown error:', err.message);
        res.status(500).json({
            statusCode: 500,
            message: err.message || 'An unknown error occurred',
            success: false,
        });
    };
};