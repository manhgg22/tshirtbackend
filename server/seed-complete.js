import mongoose from 'mongoose';
import Category from './src/models/Category.js';
import Product from './src/models/Product.js';
import User from './src/models/User.js';
import bcrypt from 'bcryptjs';

// Connect to MongoDB
await mongoose.connect('mongodb://127.0.0.1:27017/vietnam-tshirts');

console.log('🌱 Starting database seeding...');

// Clear existing data
await Category.deleteMany({});
await Product.deleteMany({});
console.log('✅ Cleared existing data');

// Create categories
const categories = [
  {
    name: 'Áo Thun',
    slug: 'ao-thun',
    description: 'Áo thun cotton cao cấp với thiết kế Việt Nam',
    level: 0,
    sortOrder: 1,
  },
  {
    name: 'Áo Polo',
    slug: 'ao-polo',
    description: 'Áo polo premium với chất liệu cao cấp',
    level: 0,
    sortOrder: 2,
  },
  {
    name: 'Hoodie',
    slug: 'hoodie',
    description: 'Hoodie unisex với thiết kế hiện đại',
    level: 0,
    sortOrder: 3,
  },
  {
    name: 'Tank Top',
    slug: 'tank-top',
    description: 'Tank top thể thao với chất liệu thoáng mát',
    level: 0,
    sortOrder: 4,
  },
];

const createdCategories = await Category.insertMany(categories);
console.log('✅ Created categories');

// Create products
const products = [
  {
    name: 'Áo thun Tự hào Việt Nam',
    slug: 'ao-thun-tu-hao-viet-nam',
    description: 'Áo thun cotton cao cấp với thiết kế cờ đỏ sao vàng hiện đại. Chất liệu 100% cotton, thoáng mát, bền màu.',
    shortDescription: 'Áo thun cotton cao cấp với thiết kế cờ đỏ sao vàng',
    price: 299000,
    originalPrice: 399000,
    images: [
      {
        url: '/images/aothuntest/aothun1.webp',
        alt: 'Áo thun Tự hào Việt Nam',
        isPrimary: true,
      },
    ],
    category: createdCategories[0]._id,
    brand: 'Vietnam T-Shirts',
    sku: 'VT001',
    stock: 100,
    weight: 200,
    tags: ['vietnam', 'cotton', 'premium'],
    isFeatured: true,
    rating: {
      average: 4.8,
      count: 1250,
    },
    sales: 1250,
  },
  {
    name: 'Áo polo Hà Nội phố cổ',
    slug: 'ao-polo-ha-noi-pho-co',
    description: 'Polo premium in hình phố cổ Hà Nội vintage. Chất liệu pique cotton, form dáng chuẩn.',
    shortDescription: 'Polo premium in hình phố cổ Hà Nội vintage',
    price: 450000,
    originalPrice: 550000,
    images: [
      {
        url: '/images/aothuntest/aothun2.webp',
        alt: 'Áo polo Hà Nội phố cổ',
        isPrimary: true,
      },
    ],
    category: createdCategories[1]._id,
    brand: 'Vietnam T-Shirts',
    sku: 'VP001',
    stock: 80,
    weight: 250,
    tags: ['hanoi', 'polo', 'vintage'],
    isFeatured: true,
    rating: {
      average: 4.9,
      count: 890,
    },
    sales: 890,
  },
  {
    name: 'Hoodie Sài Gòn về đêm',
    slug: 'hoodie-sai-gon-ve-dem',
    description: 'Hoodie unisex với họa tiết skyline Sài Gòn lung linh. Chất liệu fleece cotton, ấm áp.',
    shortDescription: 'Hoodie unisex với họa tiết skyline Sài Gòn lung linh',
    price: 599000,
    originalPrice: 699000,
    images: [
      {
        url: '/images/aothuntest/aothun3.webp',
        alt: 'Hoodie Sài Gòn về đêm',
        isPrimary: true,
      },
    ],
    category: createdCategories[2]._id,
    brand: 'Vietnam T-Shirts',
    sku: 'VH001',
    stock: 60,
    weight: 500,
    tags: ['saigon', 'hoodie', 'night'],
    isFeatured: true,
    rating: {
      average: 4.7,
      count: 675,
    },
    sales: 675,
  },
  {
    name: 'Áo tank top Hạ Long Bay',
    slug: 'ao-tank-top-ha-long-bay',
    description: 'Tank top thể thao với art vịnh Hạ Long tuyệt đẹp. Chất liệu polyester thoáng mát.',
    shortDescription: 'Tank top thể thao với art vịnh Hạ Long tuyệt đẹp',
    price: 199000,
    originalPrice: 249000,
    images: [
      {
        url: '/images/aothuntest/aothun4.webp',
        alt: 'Áo tank top Hạ Long Bay',
        isPrimary: true,
      },
    ],
    category: createdCategories[3]._id,
    brand: 'Vietnam T-Shirts',
    sku: 'VTT001',
    stock: 120,
    weight: 150,
    tags: ['halong', 'tank', 'sport'],
    isFeatured: false,
    rating: {
      average: 4.6,
      count: 432,
    },
    sales: 432,
  },
  {
    name: 'Áo thun Phở Việt Nam',
    slug: 'ao-thun-pho-viet-nam',
    description: 'Áo thun với thiết kế phở Việt Nam đặc trưng. Chất liệu cotton mềm mại.',
    shortDescription: 'Áo thun với thiết kế phở Việt Nam đặc trưng',
    price: 249000,
    originalPrice: 299000,
    images: [
      {
        url: '/images/aothuntest/aothun5.webp',
        alt: 'Áo thun Phở Việt Nam',
        isPrimary: true,
      },
    ],
    category: createdCategories[0]._id,
    brand: 'Vietnam T-Shirts',
    sku: 'VT002',
    stock: 90,
    weight: 200,
    tags: ['pho', 'food', 'vietnam'],
    isFeatured: false,
    rating: {
      average: 4.5,
      count: 320,
    },
    sales: 320,
  },
  {
    name: 'Áo thun Cà phê Việt',
    slug: 'ao-thun-ca-phe-viet',
    description: 'Áo thun với thiết kế cà phê Việt Nam nổi tiếng. Chất liệu cotton cao cấp.',
    shortDescription: 'Áo thun với thiết kế cà phê Việt Nam nổi tiếng',
    price: 279000,
    originalPrice: 329000,
    images: [
      {
        url: '/images/aothuntest/aothun6.webp',
        alt: 'Áo thun Cà phê Việt',
        isPrimary: true,
      },
    ],
    category: createdCategories[0]._id,
    brand: 'Vietnam T-Shirts',
    sku: 'VT003',
    stock: 75,
    weight: 200,
    tags: ['coffee', 'vietnam', 'culture'],
    isFeatured: true,
    rating: {
      average: 4.7,
      count: 580,
    },
    sales: 580,
  },
];

const createdProducts = await Product.insertMany(products);
console.log('✅ Created products');

// Create admin user if not exists
const existingAdmin = await User.findOne({ email: 'admin@vietnam-tshirts.com' });
if (!existingAdmin) {
  const adminUser = new User({
    name: 'Admin User',
    email: 'admin@vietnam-tshirts.com',
    password: await bcrypt.hash('admin123', 12),
    role: 'admin',
    isEmailVerified: true,
  });
  await adminUser.save();
  console.log('✅ Created admin user');
}

console.log('🎉 Database seeding completed successfully!');
console.log(`📊 Created:`);
console.log(`   - ${createdCategories.length} categories`);
console.log(`   - ${createdProducts.length} products`);
console.log(`   - 1 admin user`);

await mongoose.disconnect();
