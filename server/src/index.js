import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import designRoutes from './routes/designs.js';
import orderRoutes from './routes/orders.js';
import cityRoutes from './routes/cities.js';
import categoryRoutes from './routes/categories.js';
import reviewRoutes from './routes/reviews.js';
import voucherRoutes from './routes/vouchers.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/images', express.static(path.join(__dirname, '../../client/public/images')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/designs', designRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/vouchers', voucherRoutes);
app.use('/api', cityRoutes);

app.get("/api/test", (req, res) => {
  res.send("Hello world");
});

// MongoDB connection configuration
const DB_ENVIRONMENT = process.env.DB_ENVIRONMENT || 'local';

const MONGODB_CONFIGS = {
  local: 'mongodb://127.0.0.1:27017/vietnam-tshirts',
  atlas: process.env.MONGODB_ATLAS_URI || 'mongodb+srv://username:password@cluster.mongodb.net/vietnam-tshirts?retryWrites=true&w=majority'
};

const MONGODB_URI = process.env.MONGODB_URI || MONGODB_CONFIGS[DB_ENVIRONMENT];

console.log(`🔗 Connecting to MongoDB (${DB_ENVIRONMENT}): ${MONGODB_URI.replace(/\/\/.*@/, '//***:***@')}`);

mongoose.connect(MONGODB_URI)
  .then(() => console.log(`✅ Connected to MongoDB (${DB_ENVIRONMENT})`))
  .catch((err) => {
    console.error(`❌ MongoDB connection error (${DB_ENVIRONMENT}):`, err.message);
    if (DB_ENVIRONMENT === 'local') {
      console.log('💡 Tip: Make sure MongoDB is running locally or switch to Atlas by setting DB_ENVIRONMENT=atlas');
    }
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});