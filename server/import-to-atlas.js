// Script để import data vào MongoDB Atlas
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB Atlas connection string (thay đổi theo cluster của bạn)
const atlasMongoURI = 'mongodb+srv://manhgg22_db_user:zsygae8XCNw0JKa9@cluster0.d4zw1qf.mongodb.net/vietnam-tshirts?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
  try {
    await mongoose.connect(atlasMongoURI);
    console.log('✅ Connected to MongoDB Atlas');
  } catch (err) {
    console.error('❌ MongoDB Atlas connection error:', err.message);
    process.exit(1);
  }
};

// Import models
import User from './src/models/User.js';
import Product from './src/models/Product.js';
import Order from './src/models/Order.js';
import Category from './src/models/Category.js';

const importData = async () => {
  try {
    console.log('📥 Starting data import to MongoDB Atlas...');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    await Category.deleteMany({});
    console.log('🗑️ Cleared existing data');

    // Read backup files
    const backupDir = path.join(__dirname, 'mongodb-backup');
    
    // Import Categories first (for foreign key references)
    const categoriesData = JSON.parse(fs.readFileSync(path.join(backupDir, 'categories.json'), 'utf8'));
    const createdCategories = await Category.insertMany(categoriesData);
    console.log(`📂 Imported ${createdCategories.length} categories`);

    // Import Users
    const usersData = JSON.parse(fs.readFileSync(path.join(backupDir, 'users.json'), 'utf8'));
    const createdUsers = await User.insertMany(usersData);
    console.log(`👥 Imported ${createdUsers.length} users`);

    // Import Products (update category references)
    const productsData = JSON.parse(fs.readFileSync(path.join(backupDir, 'products.json'), 'utf8'));
    const productsWithCategory = productsData.map(product => ({
      ...product,
      category: createdCategories[0]._id // Assign to first category
    }));
    const createdProducts = await Product.insertMany(productsWithCategory);
    console.log(`🛍️ Imported ${createdProducts.length} products`);

    // Import Orders (update user and product references)
    const ordersData = JSON.parse(fs.readFileSync(path.join(backupDir, 'orders.json'), 'utf8'));
    const ordersWithRefs = ordersData.map(order => ({
      ...order,
      userId: createdUsers[0]._id, // Assign to first user
      items: order.items.map(item => ({
        ...item,
        productId: createdProducts[0]._id // Assign to first product
      }))
    }));
    const createdOrders = await Order.insertMany(ordersWithRefs);
    console.log(`📦 Imported ${createdOrders.length} orders`);

    console.log('✅ Data imported successfully to MongoDB Atlas!');
    console.log('\n🎯 Next steps:');
    console.log('1. Update MONGODB_ATLAS_URI in your environment variables');
    console.log('2. Deploy to Vercel with the new connection string');
    console.log('3. Test your application with cloud database');

  } catch (error) {
    console.error('❌ Import error:', error);
  } finally {
    mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
};

// Run import
connectDB().then(() => {
  importData();
});
