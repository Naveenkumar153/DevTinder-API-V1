import express from 'express';
import { authRoutes } from '@/modules/auth/auth.routes.js';
import { errorHandler } from '@/handlers/error.handlers.js';

const app: express.Application = express();

app.use(express.json());
app.use('/api', authRoutes);
app.use(errorHandler); // Add error handling middleware


export { app };