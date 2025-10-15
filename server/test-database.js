// Test script để kiểm tra API endpoints
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';
import Order from './src/models/Order.js';
import Product from './src/models/Product.js';

dotenv.config();

// MongoDB connection configuration
const DB_ENVIRONMENT = process.env.DB_ENVIRONMENT || 'local';

const MONGODB_CONFIGS = {
  local: 'mongodb://127.0.0.1:27017/vietnam-tshirts',
  atlas: process.env.MONGODB_ATLAS_URI || 'mongodb+srv://username:password@cluster.mongodb.net/vietnam-tshirts?retryWrites=true&w=majority'
};

const MONGODB_URI = process.env.MONGODB_URI || MONGODB_CONFIGS[DB_ENVIRONMENT];

const testDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`✅ Connected to MongoDB (${DB_ENVIRONMENT})`);

    // Test queries
    const users = await User.find().populate('addresses');
    console.log(`👥 Found ${users.length} users:`);
    users.forEach(user => {
      console.log(`- ${user.name} (${user.email}) - Phone: ${user.phone} - Addresses: ${user.addresses.length}`);
    });

    const orders = await Order.find().populate('userId').populate('items.productId');
    console.log(`📦 Found ${orders.length} orders:`);
    orders.forEach(order => {
      console.log(`- Order ${order.orderCode} - User: ${order.userId?.name} - Total: ${order.total} - Status: ${order.status}`);
    });

    const products = await Product.find().populate('category');
    console.log(`🛍️ Found ${products.length} products:`);
    products.forEach(product => {
      console.log(`- ${product.name} - Price: ${product.price} - Stock: ${product.stock} - Category: ${product.category?.name}`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
};

testDatabase();
