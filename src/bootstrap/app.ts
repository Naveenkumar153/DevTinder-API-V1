import express from 'express';
import cookieParser from 'cookie-parser';
import { errorHandler } from '@/handlers/error.handlers.js';
import { authMiddleware } from '@/shared/middleware/auth.middleware.js';
import { authRoutes } from '@/modules/auth/auth.index.js';
import { feedRouters } from '@/modules/feed/feed.index.js';
import { usersRouters } from '@/modules/users/users.index.js';
import { connectionRouters } from '@/modules/connection/connection.index.js';

const app: express.Application = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api', authRoutes);
app.use('/api', authMiddleware.checkToken, feedRouters);
app.use('/api', authMiddleware.checkToken, usersRouters);
app.use('/api', authMiddleware.checkToken, connectionRouters);
app.use(errorHandler);


export { app };