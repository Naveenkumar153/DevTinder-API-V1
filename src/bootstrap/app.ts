import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { errorHandler } from '@/handlers/error.handlers.js';
import { authMiddleware } from '@/shared/middleware/auth.middleware.js';
import { authRoutes } from '@/modules/auth/auth.index.js';
import { feedRouters } from '@/modules/feed/feed.index.js';
import { usersRouters } from '@/modules/users/users.index.js';
import { connectionRouters } from '@/modules/connection/connection.index.js';

const app: express.Application = express();

const whitelist = [
    "https://connecttinder.cc",           // prod
    "https://www.connecttinder.cc",
    "http://localhost:5173",
    "http://40.192.110.18:3000",
    ...(process.env.CORS_ORIGIN?.split(',') ?? [])
];

const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};

app.set('trust proxy', 1);

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
});
app.use('/api', authRoutes);
app.use('/api', authMiddleware.checkToken, feedRouters);
app.use('/api', authMiddleware.checkToken, usersRouters);
app.use('/api', authMiddleware.checkToken, connectionRouters);
app.use(errorHandler);
export { app };