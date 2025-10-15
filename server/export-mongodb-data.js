// Script để export MongoDB local data
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to local MongoDB
const localMongoURI = 'mongodb://127.0.0.1:27017/vietnam-tshirts';

const connectDB = async () => {
  try {
    await mongoose.connect(localMongoURI);
    console.log('✅ Connected to local MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

// Import models
import User from './src/models/User.js';
import Product from './src/models/Product.js';
import Order from './src/models/Order.js';
import Category from './src/models/Category.js';

const exportData = async () => {
  try {
    console.log('📤 Starting data export...');

    // Export Users
    const users = await User.find({});
    console.log(`👥 Exported ${users.length} users`);
    
    // Export Products
    const products = await Product.find({});
    console.log(`🛍️ Exported ${products.length} products`);
    
    // Export Orders
    const orders = await Order.find({});
    console.log(`📦 Exported ${orders.length} orders`);
    
    // Export Categories
    const categories = await Category.find({});
    console.log(`📂 Exported ${categories.length} categories`);

    // Create backup directory
    const backupDir = path.join(__dirname, 'mongodb-backup');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir);
    }

    // Save data to JSON files
    fs.writeFileSync(
      path.join(backupDir, 'users.json'),
      JSON.stringify(users, null, 2)
    );
    
    fs.writeFileSync(
      path.join(backupDir, 'products.json'),
      JSON.stringify(products, null, 2)
    );
    
    fs.writeFileSync(
      path.join(backupDir, 'orders.json'),
      JSON.stringify(orders, null, 2)
    );
    
    fs.writeFileSync(
      path.join(backupDir, 'categories.json'),
      JSON.stringify(categories, null, 2)
    );

    console.log('✅ Data exported successfully to mongodb-backup/');
    console.log('\n📋 Files created:');
    console.log('- users.json');
    console.log('- products.json');
    console.log('- orders.json');
    console.log('- categories.json');

  } catch (error) {
    console.error('❌ Export error:', error);
  } finally {
    mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
};

// Run export
connectDB().then(() => {
  exportData();
});
