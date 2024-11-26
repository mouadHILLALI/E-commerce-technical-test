import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database';
import analyticsRoutes from './routes/AnalyticsRouter';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/analytics', analyticsRoutes);

export default app;
