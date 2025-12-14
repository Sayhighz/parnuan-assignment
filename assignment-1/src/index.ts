import 'reflect-metadata';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import transactionRoutes from './routes/transaction.routes.js';
import { loggingMiddleware } from './middlewares/logging.middleware.js';
import { ResponseUtil } from './utils/response.util.js';
import { ErrorUtil } from './utils/error.util.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/transaction-api';

// Middleware
app.use(loggingMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/transactions', transactionRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json(ResponseUtil.success({ status: 'OK', timestamp: new Date().toISOString() }));
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  ErrorUtil.handleInternalError(res, err);
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json(ResponseUtil.error('Route not found'));
});

// Connect to MongoDB and start server
async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();