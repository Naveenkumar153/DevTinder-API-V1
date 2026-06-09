import express from 'express';
import bodyParser from 'body-parser';
import { authRoutes } from '@/modules/auth/auth.routes.js';
import { errorHandler } from '@/handlers/error.handlers.js';

const app: express.Application = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', authRoutes);
app.use(errorHandler); // Add error handling middleware


export { app };