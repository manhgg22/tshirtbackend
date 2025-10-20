// Script để export MongoDB database thành file JS để chuyển sang máy khác
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/vietnam-tshirts';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB');
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
import Design from './src/models/Design.js';
import Review from './src/models/Review.js';
import Voucher from './src/models/Voucher.js';

const exportData = async () => {
  try {
    console.log('📤 Starting database export...');

    // Export all collections
    const users = await User.find({});
    const products = await Product.find({});
    const orders = await Order.find({});
    const categories = await Category.find({});
    const designs = await Design.find({});
    const reviews = await Review.find({});
    const vouchers = await Voucher.find({});

    console.log(`👥 Exported ${users.length} users`);
    console.log(`🛍️ Exported ${products.length} products`);
    console.log(`📦 Exported ${orders.length} orders`);
    console.log(`📂 Exported ${categories.length} categories`);
    console.log(`🎨 Exported ${designs.length} designs`);
    console.log(`⭐ Exported ${reviews.length} reviews`);
    console.log(`🎫 Exported ${vouchers.length} vouchers`);

    // Create export directory
    const exportDir = path.join(__dirname, 'database-export');
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir);
    }

    // Create JavaScript file with all data
    const jsContent = `// Database Export - Vietnam Heritage Collection
// Generated on: ${new Date().toISOString()}
// Total records: ${users.length + products.length + orders.length + categories.length + designs.length + reviews.length + vouchers.length}

export const databaseData = {
  users: ${JSON.stringify(users, null, 2)},
  products: ${JSON.stringify(products, null, 2)},
  orders: ${JSON.stringify(orders, null, 2)},
  categories: ${JSON.stringify(categories, null, 2)},
  designs: ${JSON.stringify(designs, null, 2)},
  reviews: ${JSON.stringify(reviews, null, 2)},
  vouchers: ${JSON.stringify(vouchers, null, 2)}
};

export const exportInfo = {
  exportDate: '${new Date().toISOString()}',
  totalUsers: ${users.length},
  totalProducts: ${products.length},
  totalOrders: ${orders.length},
  totalCategories: ${categories.length},
  totalDesigns: ${designs.length},
  totalReviews: ${reviews.length},
  totalVouchers: ${vouchers.length},
  totalRecords: ${users.length + products.length + orders.length + categories.length + designs.length + reviews.length + vouchers.length}
};

// Import function for new database
export const importToDatabase = async (mongoose) => {
  try {
    console.log('📥 Starting database import...');
    
    // Import Users
    if (databaseData.users.length > 0) {
      await mongoose.connection.db.collection('users').insertMany(databaseData.users);
      console.log(\`✅ Imported \${databaseData.users.length} users\`);
    }
    
    // Import Products
    if (databaseData.products.length > 0) {
      await mongoose.connection.db.collection('products').insertMany(databaseData.products);
      console.log(\`✅ Imported \${databaseData.products.length} products\`);
    }
    
    // Import Orders
    if (databaseData.orders.length > 0) {
      await mongoose.connection.db.collection('orders').insertMany(databaseData.orders);
      console.log(\`✅ Imported \${databaseData.orders.length} orders\`);
    }
    
    // Import Categories
    if (databaseData.categories.length > 0) {
      await mongoose.connection.db.collection('categories').insertMany(databaseData.categories);
      console.log(\`✅ Imported \${databaseData.categories.length} categories\`);
    }
    
    // Import Designs
    if (databaseData.designs.length > 0) {
      await mongoose.connection.db.collection('designs').insertMany(databaseData.designs);
      console.log(\`✅ Imported \${databaseData.designs.length} designs\`);
    }
    
    // Import Reviews
    if (databaseData.reviews.length > 0) {
      await mongoose.connection.db.collection('reviews').insertMany(databaseData.reviews);
      console.log(\`✅ Imported \${databaseData.reviews.length} reviews\`);
    }
    
    // Import Vouchers
    if (databaseData.vouchers.length > 0) {
      await mongoose.connection.db.collection('vouchers').insertMany(databaseData.vouchers);
      console.log(\`✅ Imported \${databaseData.vouchers.length} vouchers\`);
    }
    
    console.log('🎉 Database import completed successfully!');
    
  } catch (error) {
    console.error('❌ Import error:', error);
    throw error;
  }
};
`;

    // Save JavaScript file
    fs.writeFileSync(
      path.join(exportDir, 'database-export.js'),
      jsContent
    );

    // Also save individual JSON files for backup
    fs.writeFileSync(
      path.join(exportDir, 'users.json'),
      JSON.stringify(users, null, 2)
    );
    
    fs.writeFileSync(
      path.join(exportDir, 'products.json'),
      JSON.stringify(products, null, 2)
    );
    
    fs.writeFileSync(
      path.join(exportDir, 'orders.json'),
      JSON.stringify(orders, null, 2)
    );
    
    fs.writeFileSync(
      path.join(exportDir, 'categories.json'),
      JSON.stringify(categories, null, 2)
    );

    fs.writeFileSync(
      path.join(exportDir, 'designs.json'),
      JSON.stringify(designs, null, 2)
    );

    fs.writeFileSync(
      path.join(exportDir, 'reviews.json'),
      JSON.stringify(reviews, null, 2)
    );

    fs.writeFileSync(
      path.join(exportDir, 'vouchers.json'),
      JSON.stringify(vouchers, null, 2)
    );

    console.log('\n✅ Database exported successfully!');
    console.log('\n📋 Files created in database-export/:');
    console.log('- database-export.js (Main file with import function)');
    console.log('- users.json');
    console.log('- products.json');
    console.log('- orders.json');
    console.log('- categories.json');
    console.log('- designs.json');
    console.log('- reviews.json');
    console.log('- vouchers.json');
    
    console.log('\n🚀 To import on new machine:');
    console.log('1. Copy database-export.js to your new project');
    console.log('2. Import: import { importToDatabase } from "./database-export.js"');
    console.log('3. Run: await importToDatabase(mongoose)');

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
