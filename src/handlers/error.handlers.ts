import { AppError } from "@/classes/errors.js";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    if(err instanceof AppError) {
        console.error('Error:', err.message, err.statusCode);
        res.status(err.statusCode).json({ message: err.message });
    } else {
        console.error('Unknown error:', err.message);
        res.status(500).json({ message: err.message ||  'An unknown error occurred' });
    }; 
};