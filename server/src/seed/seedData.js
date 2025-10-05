import mongoose from 'mongoose';
import Product from '../models/Product.js';
import User from '../models/User.js';
import Design from '../models/Design.js';

const seedProducts = [
  {
    name: "Áo Thun Tinh Thần Việt Nam",
    description: "Áo thun cotton cao cấp in hình cờ đỏ sao vàng, thể hiện niềm tự hào dân tộc",
    price: 199000,
    category: "Áo thun",
    image: "https://via.placeholder.com/400x400/dc2626/ffffff?text=Áo+Thun+Việt+Nam",
    sizes: [
      { size: "S", stock: 50 },
      { size: "M", stock: 100 },
      { size: "L", stock: 80 },
      { size: "XL", stock: 60 }
    ],
    colors: ["Đỏ", "Trắng", "Xanh navy"],
    tags: ["Việt Nam", "Cờ đỏ sao vàng", "Tự hào dân tộc"],
    featured: true,
    rating: 4.8,
    reviewCount: 156
  },
  {
    name: "Hoodie Cờ Đỏ Sao Vàng",
    description: "Hoodie ấm áp với thiết kế cờ đỏ sao vàng nổi bật, phù hợp mùa đông",
    price: 399000,
    category: "Hoodie",
    image: "https://via.placeholder.com/400x400/059669/ffffff?text=Hoodie+Việt+Nam",
    sizes: [
      { size: "S", stock: 30 },
      { size: "M", stock: 50 },
      { size: "L", stock: 40 },
      { size: "XL", stock: 25 }
    ],
    colors: ["Đỏ", "Xám", "Đen"],
    tags: ["Hoodie", "Mùa đông", "Cờ đỏ sao vàng"],
    featured: true,
    rating: 4.9,
    reviewCount: 89
  },
  {
    name: "Áo Dài Cách Tân Hiện Đại",
    description: "Áo dài cách tân kết hợp truyền thống và hiện đại, phù hợp mọi dịp",
    price: 599000,
    category: "Áo dài cách tân",
    image: "https://via.placeholder.com/400x400/7c3aed/ffffff?text=Áo+Dài+Cách+Tân",
    sizes: [
      { size: "S", stock: 20 },
      { size: "M", stock: 35 },
      { size: "L", stock: 30 },
      { size: "XL", stock: 15 }
    ],
    colors: ["Đỏ", "Xanh", "Tím", "Vàng"],
    tags: ["Áo dài", "Truyền thống", "Cách tân"],
    featured: true,
    rating: 4.7,
    reviewCount: 67
  },
  {
    name: "Áo Thun Hoa Sen Việt",
    description: "Áo thun in hình hoa sen - quốc hoa Việt Nam, thanh lịch và ý nghĩa",
    price: 179000,
    category: "Áo thun",
    image: "https://via.placeholder.com/400x400/eab308/ffffff?text=Áo+Thun+Hoa+Sen",
    sizes: [
      { size: "S", stock: 40 },
      { size: "M", stock: 70 },
      { size: "L", stock: 55 },
      { size: "XL", stock: 35 }
    ],
    colors: ["Trắng", "Hồng", "Xanh lá"],
    tags: ["Hoa sen", "Quốc hoa", "Thanh lịch"],
    featured: false,
    rating: 4.6,
    reviewCount: 43
  },
  {
    name: "Hoodie Chữ S Việt Nam",
    description: "Hoodie với thiết kế chữ S hình dáng Việt Nam độc đáo và sáng tạo",
    price: 349000,
    category: "Hoodie",
    image: "https://via.placeholder.com/400x400/374151/ffffff?text=Hoodie+Chữ+S",
    sizes: [
      { size: "S", stock: 25 },
      { size: "M", stock: 45 },
      { size: "L", stock: 35 },
      { size: "XL", stock: 20 }
    ],
    colors: ["Đen", "Xám", "Navy"],
    tags: ["Chữ S", "Hình dáng Việt Nam", "Sáng tạo"],
    featured: false,
    rating: 4.5,
    reviewCount: 28
  },
  {
    name: "Túi Vải Canvas Việt Nam",
    description: "Túi vải canvas thân thiện môi trường với in hình biểu tượng Việt Nam",
    price: 89000,
    category: "Phụ kiện",
    image: "https://via.placeholder.com/400x400/16a34a/ffffff?text=Túi+Vải+Canvas",
    sizes: [
      { size: "One Size", stock: 100 }
    ],
    colors: ["Trắng", "Xanh", "Đỏ"],
    tags: ["Canvas", "Thân thiện môi trường", "Túi vải"],
    featured: false,
    rating: 4.4,
    reviewCount: 72
  }
];

const seedUsers = [
  {
    name: "Admin User",
    email: "admin@vietnamese-spirit.com",
    password: "admin123",
    role: "admin"
  },
  {
    name: "Test User",
    email: "user@test.com",
    password: "user123",
    role: "user"
  }
];

const seedDesigns = [
  {
    name: "Thiết kế Cờ Đỏ Sao Vàng",
    productType: "tshirt",
    color: "#ffffff",
    elements: [
      {
        type: "text",
        content: "VIỆT NAM",
        x: 150,
        y: 200,
        width: 200,
        height: 50,
        color: "#da251d",
        fontSize: 24
      },
      {
        type: "icon",
        content: "⭐",
        x: 200,
        y: 150,
        width: 50,
        height: 50,
        fontSize: 32
      }
    ],
    isPublic: true,
    likes: 15,
    downloads: 8
  }
];

export const seedDatabase = async () => {
  try {
    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    await Design.deleteMany({});

    // Seed products
    const products = await Product.insertMany(seedProducts);
    console.log(`✅ Seeded ${products.length} products`);

    // Seed users
    const users = await User.insertMany(seedUsers);
    console.log(`✅ Seeded ${users.length} users`);

    // Seed designs with user reference
    const designs = await Design.insertMany(
      seedDesigns.map(design => ({
        ...design,
        userId: users[1]._id // Assign to test user
      }))
    );
    console.log(`✅ Seeded ${designs.length} designs`);

    console.log('🎉 Database seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
};

export default { seedDatabase };
