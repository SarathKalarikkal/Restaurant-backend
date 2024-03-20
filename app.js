import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { dbConnection } from './dataBase/dbConnection.js';
import reservationRoute from './routes/reservationRoute.js';
import { errorMiddleware } from './error/error.js';

const app = express();

dotenv.config({ path: './config/config.env' });

// Enable CORS with the appropriate origin and credentials settings
app.use(
  cors({
    origin: 'https://restaurant-frontend-azure.vercel.app',
    methods: ['POST'], // Allow only POST requests
    credentials: true, // Allow cookies and authorization headers
  })
);


// Parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
dbConnection();

// Error handling middleware
app.use(errorMiddleware);

// Routes
app.use('/api/reservation', reservationRoute);

export default app;
