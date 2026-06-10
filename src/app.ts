import express from 'express';
import { authRoutes } from '@/modules/auth/auth.routes.js';
import { errorHandler } from '@/handlers/error.handlers.js';
import { feedRouter } from '@/modules/feed/feed.routes.js';
import { usersRouter } from '@/modules/users/users.routes.js';

const app: express.Application = express();

app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', feedRouter);
app.use('/api', usersRouter);
app.use(errorHandler); // Add error handling middleware


export { app };