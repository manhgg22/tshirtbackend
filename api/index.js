// Vercel API handler
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import authRoutes from '../server/src/routes/auth.js';
import productRoutes from '../server/src/routes/products.js';
import orderRoutes from '../server/src/routes/orders.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const DB_ENVIRONMENT = process.env.DB_ENVIRONMENT || 'atlas';

const MONGODB_CONFIGS = {
  local: 'mongodb://127.0.0.1:27017/vietnam-tshirts',
  atlas: 'mongodb+srv://manhgg22_db_user:zsygae8XCNw0JKa9@cluster0.d4zw1qf.mongodb.net/vietnam-tshirts?retryWrites=true&w=majority&appName=Cluster0'
};

const MONGODB_URI = process.env.MONGODB_URI || MONGODB_CONFIGS[DB_ENVIRONMENT];

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Vietnam T-shirts API is running!' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Export for Vercel
export default app;
