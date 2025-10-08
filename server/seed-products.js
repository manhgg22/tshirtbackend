import mongoose from 'mongoose';
import Product from './src/models/Product.js';
import dotenv from 'dotenv';

dotenv.config();

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/vietnam-tshirts';

const sampleProducts = [
  {
    name: 'Áo thun Việt Nam cờ đỏ sao vàng',
    price: 150000,
    description: 'Áo thun chất lượng cao với thiết kế cờ đỏ sao vàng Việt Nam',
    image: 'https://via.placeholder.com/300x200/ff0000/ffffff?text=Co+Do+Sao+Vang',
    category: 'Áo thun',
    stock: 100
  },
  {
    name: 'Áo polo cổ điển',
    price: 200000,
    description: 'Áo polo cổ điển phong cách với chất liệu cotton cao cấp',
    image: 'https://via.placeholder.com/300x200/1890ff/ffffff?text=Ao+Polo+Co+Dien',
    category: 'Áo polo',
    stock: 50
  },
  {
    name: 'Áo hoodie trẻ trung',
    price: 300000,
    description: 'Áo hoodie trẻ trung và năng động với thiết kế hiện đại',
    image: 'https://via.placeholder.com/300x200/722ed1/ffffff?text=Ao+Hoodie',
    category: 'Áo hoodie',
    stock: 30
  },
  {
    name: 'Áo khoác gió chống nước',
    price: 250000,
    description: 'Áo khoác gió chống nước với thiết kế thể thao',
    image: 'https://via.placeholder.com/300x200/52c41a/ffffff?text=Ao+Khoac+Gio',
    category: 'Áo khoác',
    stock: 25
  },
  {
    name: 'Áo thun đồng phục công ty',
    price: 120000,
    description: 'Áo thun đồng phục công ty với thiết kế chuyên nghiệp',
    image: 'https://via.placeholder.com/300x200/faad14/ffffff?text=Ao+Dong+Phuc',
    category: 'Áo thun',
    stock: 200
  },
  {
    name: 'Áo tank top thể thao',
    price: 100000,
    description: 'Áo tank top thể thao với chất liệu thấm hút mồ hôi',
    image: 'https://via.placeholder.com/300x200/ff4d4f/ffffff?text=Ao+Tank+Top',
    category: 'Áo tank top',
    stock: 75
  }
];

async function seedProducts() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    const products = await Product.insertMany(sampleProducts);
    console.log(`Inserted ${products.length} products`);

    console.log('Sample products:');
    products.forEach(product => {
      console.log(`- ${product.name}: ${product.price.toLocaleString('vi-VN')}đ`);
    });

  } catch (error) {
    console.error('Error seeding products:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seedProducts();
