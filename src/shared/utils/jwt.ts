import { authConfig } from '@/config/auth.config.js';
import jwt from 'jsonwebtoken';

export const jwtService = {
    sign(id: string, secret: string, options: any): string {
        return jwt.sign({ id }, secret, options);
    },

    verify(token: string, secret: string): any {
        return jwt.verify(token, secret);
    },

    generateToken(
        id: string,
        secret: string = authConfig.jwt.secret,
        options: { algorithm: string, expiresIn: string } = {
            algorithm: authConfig.jwt.algorithm,
            expiresIn: authConfig.jwt.expiresIn
        }
    ): string {
        return this.sign(id, secret, options);
    }

};