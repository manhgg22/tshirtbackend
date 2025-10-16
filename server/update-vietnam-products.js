import mongoose from 'mongoose';
import Product from './src/models/Product.js';
import Category from './src/models/Category.js';

// MongoDB connection
const MONGODB_URI = 'mongodb+srv://manhgg22_db_user:zsygae8XCNw0JKa9@cluster0.d4zw1qf.mongodb.net/vietnam-tshirts?retryWrites=true&w=majority&appName=Cluster0';

async function clearAndSeedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Xóa tất cả sản phẩm cũ
    await Product.deleteMany({});
    console.log('🗑️ Deleted all old products');

    // Xóa tất cả categories cũ
    await Category.deleteMany({});
    console.log('🗑️ Deleted all old categories');

    // Tạo categories mới
    const categories = [
      {
        name: 'Áo Thun',
        slug: 'ao-thun',
        description: 'Áo thun thiết kế văn hóa Việt Nam'
      },
      {
        name: 'Áo Polo',
        slug: 'ao-polo',
        description: 'Áo polo cao cấp phong cách Việt Nam'
      }
    ];

    const createdCategories = await Category.insertMany(categories);
    console.log('✅ Created new categories');

    // Sản phẩm mới với tên liên quan Việt Nam (không phải thánh nhân)
    const newProducts = [
      {
        name: 'Áo thun Cà phê Việt',
        slug: 'ao-thun-ca-phe-viet',
        description: 'Áo thun thiết kế đặc biệt với hình ảnh cà phê Việt Nam truyền thống',
        shortDescription: 'Áo thun cà phê Việt Nam',
        price: 279000,
        originalPrice: 350000,
        images: [
          {
            url: '/images/aothuntest/aothun1.webp',
            alt: 'Áo thun Cà phê Việt',
            isPrimary: true
          }
        ],
        category: createdCategories[0]._id, // Áo Thun
        brand: 'Vietnam Style',
        sku: 'VT-CP-001',
        variants: [
          {
            size: 'S',
            color: 'Trắng',
            stock: 50,
            price: 279000
          },
          {
            size: 'M',
            color: 'Trắng',
            stock: 50,
            price: 279000
          },
          {
            size: 'L',
            color: 'Trắng',
            stock: 50,
            price: 279000
          },
          {
            size: 'XL',
            color: 'Trắng',
            stock: 50,
            price: 279000
          }
        ],
        stock: 200,
        weight: 0.2,
        dimensions: { length: 70, width: 50, height: 1 },
        tags: ['cà phê', 'việt nam', 'truyền thống'],
        isFeatured: true,
        isActive: true,
        rating: { average: 4.8, count: 156 },
        sales: 89,
        views: 234
      },
      {
        name: 'Áo thun Phở Việt Nam',
        slug: 'ao-thun-pho-viet-nam',
        description: 'Áo thun với hình ảnh phở truyền thống Việt Nam và dòng chữ "Độc lập - Tự do - Hạnh phúc"',
        shortDescription: 'Áo thun phở Việt Nam',
        price: 249000,
        originalPrice: 320000,
        images: [
          {
            url: '/images/aothuntest/aothun2.webp',
            alt: 'Áo thun Phở Việt Nam',
            isPrimary: true
          }
        ],
        category: createdCategories[0]._id, // Áo Thun
        brand: 'Vietnam Style',
        sku: 'VT-PH-002',
        variants: [
          {
            size: 'S',
            color: 'Trắng',
            stock: 45,
            price: 249000
          },
          {
            size: 'M',
            color: 'Trắng',
            stock: 45,
            price: 249000
          },
          {
            size: 'L',
            color: 'Trắng',
            stock: 45,
            price: 249000
          },
          {
            size: 'XL',
            color: 'Trắng',
            stock: 45,
            price: 249000
          }
        ],
        stock: 180,
        weight: 0.2,
        dimensions: { length: 70, width: 50, height: 1 },
        tags: ['phở', 'việt nam', 'ẩm thực'],
        isFeatured: true,
        isActive: true,
        rating: { average: 4.7, count: 134 },
        sales: 76,
        views: 198
      },
      {
        name: 'Áo polo Hà Nội phố cổ',
        slug: 'ao-polo-ha-noi-pho-co',
        description: 'Áo polo cao cấp với thiết kế phố cổ Hà Nội và dòng chữ "VIỆT NAM" nổi bật',
        shortDescription: 'Áo polo Hà Nội phố cổ',
        price: 450000,
        originalPrice: 580000,
        images: [
          {
            url: '/images/aothuntest/aothun3.webp',
            alt: 'Áo polo Hà Nội phố cổ',
            isPrimary: true
          }
        ],
        category: createdCategories[1]._id, // Áo Polo
        brand: 'Vietnam Style',
        sku: 'VP-HN-003',
        variants: [
          {
            size: 'S',
            color: 'Trắng',
            stock: 30,
            price: 450000
          },
          {
            size: 'M',
            color: 'Trắng',
            stock: 30,
            price: 450000
          },
          {
            size: 'L',
            color: 'Trắng',
            stock: 30,
            price: 450000
          },
          {
            size: 'XL',
            color: 'Trắng',
            stock: 30,
            price: 450000
          }
        ],
        stock: 120,
        weight: 0.3,
        dimensions: { length: 75, width: 55, height: 1 },
        tags: ['hà nội', 'phố cổ', 'việt nam'],
        isFeatured: true,
        isActive: true,
        rating: { average: 4.9, count: 89 },
        sales: 45,
        views: 156
      },
      {
        name: 'Áo thun Bánh mì Việt',
        slug: 'ao-thun-banh-mi-viet',
        description: 'Áo thun thiết kế với hình ảnh bánh mì Việt Nam - món ăn đường phố nổi tiếng thế giới',
        shortDescription: 'Áo thun bánh mì Việt',
        price: 269000,
        originalPrice: 340000,
        images: [
          {
            url: '/images/aothuntest/aothun4.webp',
            alt: 'Áo thun Bánh mì Việt',
            isPrimary: true
          }
        ],
        category: createdCategories[0]._id, // Áo Thun
        brand: 'Vietnam Style',
        sku: 'VT-BM-004',
        variants: [
          {
            size: 'S',
            color: 'Trắng',
            stock: 40,
            price: 269000
          },
          {
            size: 'M',
            color: 'Trắng',
            stock: 40,
            price: 269000
          },
          {
            size: 'L',
            color: 'Trắng',
            stock: 40,
            price: 269000
          },
          {
            size: 'XL',
            color: 'Trắng',
            stock: 40,
            price: 269000
          }
        ],
        stock: 160,
        weight: 0.2,
        dimensions: { length: 70, width: 50, height: 1 },
        tags: ['bánh mì', 'việt nam', 'ẩm thực'],
        isFeatured: true,
        isActive: true,
        rating: { average: 4.6, count: 98 },
        sales: 62,
        views: 167
      },
      {
        name: 'Áo thun Chợ Bến Thành',
        slug: 'ao-thun-cho-ben-thanh',
        description: 'Áo thun thiết kế với hình ảnh chợ Bến Thành - biểu tượng của Sài Gòn',
        shortDescription: 'Áo thun chợ Bến Thành',
        price: 289000,
        originalPrice: 360000,
        images: [
          {
            url: '/images/aothuntest/aothun5.webp',
            alt: 'Áo thun Chợ Bến Thành',
            isPrimary: true
          }
        ],
        category: createdCategories[0]._id, // Áo Thun
        brand: 'Vietnam Style',
        sku: 'VT-BT-005',
        variants: [
          {
            size: 'S',
            color: 'Trắng',
            stock: 35,
            price: 289000
          },
          {
            size: 'M',
            color: 'Trắng',
            stock: 35,
            price: 289000
          },
          {
            size: 'L',
            color: 'Trắng',
            stock: 35,
            price: 289000
          },
          {
            size: 'XL',
            color: 'Trắng',
            stock: 35,
            price: 289000
          }
        ],
        stock: 140,
        weight: 0.2,
        dimensions: { length: 70, width: 50, height: 1 },
        tags: ['chợ bến thành', 'sài gòn', 'việt nam'],
        isFeatured: true,
        isActive: true,
        rating: { average: 4.8, count: 112 },
        sales: 58,
        views: 189
      },
      {
        name: 'Áo polo Sông Hồng',
        slug: 'ao-polo-song-hong',
        description: 'Áo polo thiết kế với hình ảnh sông Hồng - dòng sông mẹ của Việt Nam',
        shortDescription: 'Áo polo sông Hồng',
        price: 420000,
        originalPrice: 550000,
        images: [
          {
            url: '/images/aothuntest/aothun6.webp',
            alt: 'Áo polo Sông Hồng',
            isPrimary: true
          }
        ],
        category: createdCategories[1]._id, // Áo Polo
        brand: 'Vietnam Style',
        sku: 'VP-SH-006',
        variants: [
          {
            size: 'S',
            color: 'Trắng',
            stock: 25,
            price: 420000
          },
          {
            size: 'M',
            color: 'Trắng',
            stock: 25,
            price: 420000
          },
          {
            size: 'L',
            color: 'Trắng',
            stock: 25,
            price: 420000
          },
          {
            size: 'XL',
            color: 'Trắng',
            stock: 25,
            price: 420000
          }
        ],
        stock: 100,
        weight: 0.3,
        dimensions: { length: 75, width: 55, height: 1 },
        tags: ['sông hồng', 'việt nam', 'thiên nhiên'],
        isFeatured: true,
        isActive: true,
        rating: { average: 4.7, count: 76 },
        sales: 38,
        views: 134
      }
    ];

    // Thêm sản phẩm mới vào database
    const createdProducts = await Product.insertMany(newProducts);
    console.log(`✅ Created ${createdProducts.length} new products`);

    console.log('\n🎉 Database updated successfully!');
    console.log('📦 New products:');
    createdProducts.forEach(product => {
      console.log(`  - ${product.name}: ${product.price.toLocaleString('vi-VN')}₫`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Chạy script
clearAndSeedDatabase();
