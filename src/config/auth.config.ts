
interface Jwt {
    secret: string,
    algorithm: string,
    expiresIn: string
}

export const authConfig: { jwt: Jwt } = {
    jwt: {
        secret: process.env.JWT_SECRET || 'DevTinder@2026',
        algorithm: 'HS256',
        expiresIn: '30Minutes'
    }
};