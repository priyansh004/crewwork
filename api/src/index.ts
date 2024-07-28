import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectToDatabase } from './utils/database';
import morgan from 'morgan';
import helmet from 'helmet';
import { errorHandler } from './utils/errorhandler';
import authRoute from './routes/authRoute';
import taskRoute from './routes/taskRoute';
import next from 'next';
import { Request, Response } from 'express';
import { IncomingMessage, ServerResponse } from 'http';
import { getUserData } from './controllers/authController';

dotenv.config();

const isDev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev: isDev });
const handle = nextApp.getRequestHandler();

const server = express();

server.use(express.json());
server.use(cookieParser());

// CORS configuration
const corsOptions = {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
    exposedHeaders: ['authorization'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

server.use(cors(corsOptions));

// Database connection
connectToDatabase();

// Middleware for logging, security, and error handling
server.use(morgan('common'));
server.use(helmet());  
server.use(errorHandler);

// API routes
server.use('/api/auth', authRoute);
server.use('/api/task', taskRoute);
server.use('/api/user',getUserData)

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
