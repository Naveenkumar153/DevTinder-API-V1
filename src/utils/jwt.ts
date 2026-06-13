import jwt from 'jsonwebtoken';

export const jwtService = {
    sign(id: string, secret: string, options: any): string {
        return jwt.sign({ id }, secret, options);
    },

    verify(token: string, secret: string): any {
        return jwt.verify(token, secret);
    },
};