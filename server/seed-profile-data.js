import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './src/models/User.js';
import Product from './src/models/Product.js';
import Order from './src/models/Order.js';
import Category from './src/models/Category.js';

dotenv.config();

// MongoDB connection configuration (same as index.js)
const DB_ENVIRONMENT = process.env.DB_ENVIRONMENT || 'local';

const MONGODB_CONFIGS = {
  local: 'mongodb://127.0.0.1:27017/vietnam-tshirts',
  atlas: process.env.MONGODB_ATLAS_URI || 'mongodb+srv://username:password@cluster.mongodb.net/vietnam-tshirts?retryWrites=true&w=majority'
};

const MONGODB_URI = process.env.MONGODB_URI || MONGODB_CONFIGS[DB_ENVIRONMENT];

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`✅ Connected to MongoDB (${DB_ENVIRONMENT})`);
  } catch (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);
  }
};

// Sample users data
const sampleUsers = [
  {
    name: 'Nguyễn Văn An',
    email: 'nguyenvanan@email.com',
    password: '123456',
    phone: '0123456789',
    avatar: '',
    role: 'user',
    isEmailVerified: true,
    isPhoneVerified: true,
    addresses: [
      {
        type: 'home',
        name: 'Nguyễn Văn An',
        phone: '0123456789',
        address: '123 Đường ABC, Phường Dịch Vọng',
        city: 'Hà Nội',
        district: 'Cầu Giấy',
        ward: 'Dịch Vọng',
        zipcode: '100000',
        isDefault: true
      },
      {
        type: 'work',
        name: 'Nguyễn Văn An',
        phone: '0123456789',
        address: '456 Tòa nhà XYZ, Phường Bến Nghé',
        city: 'TP. Hồ Chí Minh',
        district: 'Quận 1',
        ward: 'Phường Bến Nghé',
        zipcode: '700000',
        isDefault: false
      }
    ],
    preferences: {
      newsletter: true,
      notifications: {
        email: true,
        sms: true,
        push: false
      }
    }
  },
  {
    name: 'Trần Thị Bình',
    email: 'tranthibinh@email.com',
    password: '123456',
    phone: '0987654321',
    avatar: '',
    role: 'user',
    isEmailVerified: true,
    isPhoneVerified: true,
    addresses: [
      {
        type: 'home',
        name: 'Trần Thị Bình',
        phone: '0987654321',
        address: '789 Đường DEF, Phường Hải Châu I',
        city: 'Đà Nẵng',
        district: 'Hải Châu',
        ward: 'Phường Hải Châu I',
        zipcode: '500000',
        isDefault: true
      }
    ],
    preferences: {
      newsletter: false,
      notifications: {
        email: true,
        sms: false,
        push: true
      }
    }
  },
  {
    name: 'Lê Văn Cường',
    email: 'levancuong@email.com',
    password: '123456',
    phone: '0369852147',
    avatar: '',
    role: 'user',
    isEmailVerified: false,
    isPhoneVerified: true,
    addresses: [
      {
        type: 'home',
        name: 'Lê Văn Cường',
        phone: '0369852147',
        address: '321 Đường GHI, Phường Máy Chai',
        city: 'Hải Phòng',
        district: 'Ngô Quyền',
        ward: 'Phường Máy Chai',
        zipcode: '180000',
        isDefault: true
      }
    ],
    preferences: {
      newsletter: true,
      notifications: {
        email: false,
        sms: true,
        push: true
      }
    }
  }
];

// Sample categories data
const sampleCategories = [
  {
    name: 'Anh Hùng Dân Tộc',
    slug: 'anh-hung-dan-toc',
    description: 'Áo thun in hình các anh hùng dân tộc Việt Nam',
    image: '/images/vuahung.webp'
  },
  {
    name: 'Văn Hóa Việt Nam',
    slug: 'van-hoa-viet-nam',
    description: 'Áo thun thể hiện văn hóa truyền thống Việt Nam',
    image: '/images/placeholder.png'
  }
];

// Sample products data (for wishlist)
const sampleProducts = [
  {
    name: 'Áo thun Trần Hưng Đạo',
    slug: 'ao-thun-tran-hung-dao',
    price: 299000,
    originalPrice: 349000,
    images: [
      {
        url: '/images/tranhungdao.jpg',
        alt: 'Áo thun Trần Hưng Đạo',
        isPrimary: true
      }
    ],
    stock: 50,
    inStock: true,
    description: 'Áo thun in hình Trần Hưng Đạo - Hổ tướng dân tộc',
    shortDescription: 'Áo thun chất lượng cao in hình Trần Hưng Đạo',
    brand: 'Việt Nam Style',
    sku: 'VNS-THD-001'
  },
  {
    name: 'Áo thun Vua Hùng',
    slug: 'ao-thun-vua-hung',
    price: 299000,
    originalPrice: 349000,
    images: [
      {
        url: '/images/vuahung.webp',
        alt: 'Áo thun Vua Hùng',
        isPrimary: true
      }
    ],
    stock: 30,
    inStock: true,
    description: 'Áo thun in hình Vua Hùng - Tổ tiên dân tộc',
    shortDescription: 'Áo thun chất lượng cao in hình Vua Hùng',
    brand: 'Việt Nam Style',
    sku: 'VNS-VH-002'
  },
  {
    name: 'Áo thun Hai Bà Trưng',
    slug: 'ao-thun-hai-ba-trung',
    price: 199000,
    originalPrice: 299000,
    images: [
      {
        url: '/images/haibatrung.jpg',
        alt: 'Áo thun Hai Bà Trưng',
        isPrimary: true
      }
    ],
    stock: 0,
    inStock: false,
    description: 'Áo thun in hình Hai Bà Trưng - Nữ tướng anh hùng',
    shortDescription: 'Áo thun chất lượng cao in hình Hai Bà Trưng',
    brand: 'Việt Nam Style',
    sku: 'VNS-HBT-003'
  },
  {
    name: 'Áo thun Hồ Chí Minh',
    slug: 'ao-thun-ho-chi-minh',
    price: 299000,
    originalPrice: 349000,
    images: [
      {
        url: '/images/chutichhochiminh.jpg',
        alt: 'Áo thun Hồ Chí Minh',
        isPrimary: true
      }
    ],
    stock: 25,
    inStock: true,
    description: 'Áo thun in hình Chủ tịch Hồ Chí Minh',
    shortDescription: 'Áo thun chất lượng cao in hình Chủ tịch Hồ Chí Minh',
    brand: 'Việt Nam Style',
    sku: 'VNS-HCM-004'
  }
];

// Sample orders data
const sampleOrders = [
  {
    userId: null, // Will be set after user creation
    orderCode: 'ORD-2024-001',
    items: [
      {
        productId: null, // Will be set after product creation
        quantity: 1,
        price: 299000
      },
      {
        productId: null,
        quantity: 2,
        price: 299000
      }
    ],
    customerInfo: {
      name: 'Nguyễn Văn An',
      phone: '0123456789',
      email: 'nguyenvanan@email.com',
      address: '123 Đường ABC, Phường Dịch Vọng',
      city: 'Hà Nội',
      district: 'Cầu Giấy',
      zipcode: '100000'
    },
    shippingAddress: {
      street: '123 Đường ABC, Phường Dịch Vọng',
      city: 'Hà Nội',
      state: 'Hà Nội',
      zipCode: '100000',
      country: 'Việt Nam'
    },
    paymentMethod: 'qr_tpbank',
    status: 'delivered',
    paymentStatus: 'paid',
    total: 897000
  },
  {
    userId: null,
    orderCode: 'ORD-2024-002',
    items: [
      {
        productId: null,
        quantity: 1,
        price: 199000
      }
    ],
    customerInfo: {
      name: 'Nguyễn Văn An',
      phone: '0123456789',
      email: 'nguyenvanan@email.com',
      address: '123 Đường ABC, Phường Dịch Vọng',
      city: 'Hà Nội',
      district: 'Cầu Giấy',
      zipcode: '100000'
    },
    shippingAddress: {
      street: '123 Đường ABC, Phường Dịch Vọng',
      city: 'Hà Nội',
      state: 'Hà Nội',
      zipCode: '100000',
      country: 'Việt Nam'
    },
    paymentMethod: 'bank_transfer',
    status: 'shipped',
    paymentStatus: 'paid',
    total: 199000
  }
];

// Seed function
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    await Category.deleteMany({});
    console.log('🗑️ Cleared existing data');

    // Hash passwords
    for (let user of sampleUsers) {
      user.password = await bcrypt.hash(user.password, 12);
    }

    // Create categories first
    const createdCategories = await Category.insertMany(sampleCategories);
    console.log(`📂 Created ${createdCategories.length} categories`);

    // Create users
    const createdUsers = await User.insertMany(sampleUsers);
    console.log(`👥 Created ${createdUsers.length} users`);

    // Create products with category reference
    const productsWithCategory = sampleProducts.map(product => ({
      ...product,
      category: createdCategories[0]._id // Assign to first category
    }));
    const createdProducts = await Product.insertMany(productsWithCategory);
    console.log(`🛍️ Created ${createdProducts.length} products`);

    // Create orders with proper references
    const ordersToCreate = [];
    for (let order of sampleOrders) {
      order.userId = createdUsers[0]._id; // Assign to first user
      order.items[0].productId = createdProducts[0]._id;
      if (order.items[1]) {
        order.items[1].productId = createdProducts[1]._id;
      }
      ordersToCreate.push(order);
    }

    const createdOrders = await Order.insertMany(ordersToCreate);
    console.log(`📦 Created ${createdOrders.length} orders`);

    // Update user with orders and wishlist
    await User.findByIdAndUpdate(createdUsers[0]._id, {
      $push: {
        orders: { $each: createdOrders.map(order => order._id) },
        wishlist: { $each: createdProducts.slice(0, 2).map(product => product._id) }
      }
    });

    console.log('✅ Database seeding completed successfully!');
    console.log('\n📋 Sample accounts created:');
    console.log('1. Email: nguyenvanan@email.com | Password: 123456 | Phone: 0123456789');
    console.log('2. Email: tranthibinh@email.com | Password: 123456 | Phone: 0987654321');
    console.log('3. Email: levancuong@email.com | Password: 123456 | Phone: 0369852147');
    console.log('\n🎯 You can now login with any of these accounts to see profile data!');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
};

// Run seeding
connectDB().then(() => {
  seedDatabase();
});
