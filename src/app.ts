import express from 'express';
import cookieParser from 'cookie-parser';
import { authRoutes } from '@/modules/auth/auth.routes.js';
import { errorHandler } from '@/handlers/error.handlers.js';
import { feedRouter } from '@/modules/feed/feed.routes.js';
import { usersRouter } from '@/modules/users/users.routes.js';
import { authMiddleware } from '@/middleware/auth.middleware.js';

const app: express.Application = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api', authRoutes);
app.use('/api', authMiddleware.checkToken, feedRouter);
app.use('/api', authMiddleware.checkToken, usersRouter);
app.use(errorHandler);


export { app };