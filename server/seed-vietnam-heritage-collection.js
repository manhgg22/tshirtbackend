import mongoose from 'mongoose';
import Product from './src/models/Product.js';
import Category from './src/models/Category.js';
import dotenv from 'dotenv';

dotenv.config();

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/vietnam-tshirts';

// Vietnam Heritage Collection Products
const vietnamHeritageProducts = [
  {
    name: 'Áo thun Cà phê Việt',
    slug: 'ao-thun-ca-phe-viet',
    description: 'Áo thun được thiết kế đặc biệt tôn vinh văn hóa cà phê Việt Nam với hình ảnh vintage café và slogan "Cà phê Việt". Chất liệu cotton 100% mềm mại, thoáng mát.',
    shortDescription: 'Áo thun cà phê Việt Nam với thiết kế vintage độc đáo',
    price: 279000,
    originalPrice: 350000,
    images: [
      {
        url: '/images/aothuntest/aothun1.webp',
        alt: 'Áo thun Cà phê Việt',
        isPrimary: true
      }
    ],
    category: null, // Will be set after creating category
    brand: 'Vietnam Heritage Collection',
    sku: 'VHC-CAFE-001',
    variants: [
      {
        name: 'Size',
        options: ['S', 'M', 'L', 'XL'],
        price: 0,
        stock: 25
      },
      {
        name: 'Color',
        options: ['Trắng', 'Đen', 'Xám'],
        price: 0,
        stock: 25
      }
    ],
    stock: 100,
    inStock: true,
    weight: 200,
    dimensions: {
      length: 70,
      width: 50,
      height: 2
    },
    tags: ['cà phê', 'vietnam', 'vintage', 'heritage', 'culture'],
    isActive: true,
    isFeatured: true,
    seo: {
      title: 'Áo thun Cà phê Việt - Vietnam Heritage Collection',
      description: 'Áo thun cà phê Việt Nam với thiết kế vintage độc đáo, chất liệu cotton cao cấp',
      keywords: ['áo thun', 'cà phê việt', 'vietnam', 'heritage', 'vintage']
    },
    rating: {
      average: 4.8,
      count: 156
    },
    sales: 89,
    views: 1240
  },
  {
    name: 'Áo thun Phở Việt Nam',
    slug: 'ao-thun-pho-viet-nam',
    description: 'Áo thun thể hiện niềm tự hào dân tộc với typography đỏ "Độc lập - Tự do - Hạnh phúc" - khẩu hiệu quốc gia Việt Nam. Thiết kế tôn vinh món ăn quốc hồn quốc túy.',
    shortDescription: 'Áo thun Phở Việt Nam với khẩu hiệu quốc gia',
    price: 249000,
    originalPrice: 320000,
    images: [
      {
        url: '/images/aothuntest/aothun2.webp',
        alt: 'Áo thun Phở Việt Nam',
        isPrimary: true
      }
    ],
    category: null,
    brand: 'Vietnam Heritage Collection',
    sku: 'VHC-PHO-002',
    variants: [
      {
        name: 'Size',
        options: ['S', 'M', 'L', 'XL'],
        price: 0,
        stock: 30
      },
      {
        name: 'Color',
        options: ['Trắng', 'Đen', 'Đỏ'],
        price: 0,
        stock: 30
      }
    ],
    stock: 120,
    inStock: true,
    weight: 200,
    dimensions: {
      length: 70,
      width: 50,
      height: 2
    },
    tags: ['phở', 'vietnam', 'quốc gia', 'heritage', 'typography'],
    isActive: true,
    isFeatured: true,
    seo: {
      title: 'Áo thun Phở Việt Nam - Vietnam Heritage Collection',
      description: 'Áo thun Phở Việt Nam với khẩu hiệu quốc gia, thể hiện niềm tự hào dân tộc',
      keywords: ['áo thun', 'phở việt', 'vietnam', 'heritage', 'quốc gia']
    },
    rating: {
      average: 4.9,
      count: 203
    },
    sales: 112,
    views: 1580
  },
  {
    name: 'Áo polo Hà Nội phố cổ',
    slug: 'ao-polo-ha-noi-pho-co',
    description: 'Áo polo trắng với typography vàng-đỏ "VIỆT NAM" phản ánh văn hóa phố cổ Hà Nội. Chất liệu polo cao cấp, form dáng sang trọng.',
    shortDescription: 'Áo polo Hà Nội phố cổ với thiết kế sang trọng',
    price: 450000,
    originalPrice: 550000,
    images: [
      {
        url: '/images/aothuntest/aothun3.webp',
        alt: 'Áo polo Hà Nội phố cổ',
        isPrimary: true
      }
    ],
    category: null,
    brand: 'Vietnam Heritage Collection',
    sku: 'VHC-HANOI-003',
    variants: [
      {
        name: 'Size',
        options: ['S', 'M', 'L', 'XL', 'XXL'],
        price: 0,
        stock: 20
      },
      {
        name: 'Color',
        options: ['Trắng', 'Xanh navy', 'Đen'],
        price: 0,
        stock: 20
      }
    ],
    stock: 100,
    inStock: true,
    weight: 250,
    dimensions: {
      length: 75,
      width: 55,
      height: 2
    },
    tags: ['hà nội', 'phố cổ', 'polo', 'heritage', 'sang trọng'],
    isActive: true,
    isFeatured: true,
    seo: {
      title: 'Áo polo Hà Nội phố cổ - Vietnam Heritage Collection',
      description: 'Áo polo Hà Nội phố cổ với thiết kế sang trọng, chất liệu cao cấp',
      keywords: ['áo polo', 'hà nội', 'phố cổ', 'vietnam', 'heritage']
    },
    rating: {
      average: 4.7,
      count: 98
    },
    sales: 67,
    views: 890
  },
  {
    name: 'Áo thun Sài Gòn đêm',
    slug: 'ao-thun-sai-gon-dem',
    description: 'Thiết kế năng động thể hiện sự sôi động của Sài Gòn về đêm với hình ảnh xe máy, quán ăn đêm và ánh đèn neon. Phong cách trẻ trung, hiện đại.',
    shortDescription: 'Áo thun Sài Gòn đêm với thiết kế năng động',
    price: 299000,
    originalPrice: 380000,
    images: [
      {
        url: '/images/aothuntest/aothun4.webp',
        alt: 'Áo thun Sài Gòn đêm',
        isPrimary: true
      }
    ],
    category: null,
    brand: 'Vietnam Heritage Collection',
    sku: 'VHC-SAIGON-004',
    variants: [
      {
        name: 'Size',
        options: ['S', 'M', 'L', 'XL'],
        price: 0,
        stock: 25
      },
      {
        name: 'Color',
        options: ['Đen', 'Xám đậm', 'Navy'],
        price: 0,
        stock: 25
      }
    ],
    stock: 100,
    inStock: true,
    weight: 200,
    dimensions: {
      length: 70,
      width: 50,
      height: 2
    },
    tags: ['sài gòn', 'đêm', 'năng động', 'heritage', 'hiện đại'],
    isActive: true,
    isFeatured: true,
    seo: {
      title: 'Áo thun Sài Gòn đêm - Vietnam Heritage Collection',
      description: 'Áo thun Sài Gòn đêm với thiết kế năng động, thể hiện sự sôi động của thành phố',
      keywords: ['áo thun', 'sài gòn', 'đêm', 'vietnam', 'heritage']
    },
    rating: {
      average: 4.6,
      count: 134
    },
    sales: 78,
    views: 1100
  },
  {
    name: 'Áo thun Huế di sản',
    slug: 'ao-thun-hue-di-san',
    description: 'Thiết kế tinh tế với họa tiết hoàng cung Huế trên nền pastel nhẹ nhàng. Tôn vinh di sản văn hóa cung đình và kiến trúc truyền thống.',
    shortDescription: 'Áo thun Huế di sản với họa tiết hoàng cung',
    price: 329000,
    originalPrice: 420000,
    images: [
      {
        url: '/images/aothuntest/aothun5.webp',
        alt: 'Áo thun Huế di sản',
        isPrimary: true
      }
    ],
    category: null,
    brand: 'Vietnam Heritage Collection',
    sku: 'VHC-HUE-005',
    variants: [
      {
        name: 'Size',
        options: ['S', 'M', 'L', 'XL'],
        price: 0,
        stock: 22
      },
      {
        name: 'Color',
        options: ['Trắng', 'Kem', 'Xanh nhạt'],
        price: 0,
        stock: 22
      }
    ],
    stock: 88,
    inStock: true,
    weight: 200,
    dimensions: {
      length: 70,
      width: 50,
      height: 2
    },
    tags: ['huế', 'di sản', 'hoàng cung', 'heritage', 'truyền thống'],
    isActive: true,
    isFeatured: true,
    seo: {
      title: 'Áo thun Huế di sản - Vietnam Heritage Collection',
      description: 'Áo thun Huế di sản với họa tiết hoàng cung, tôn vinh văn hóa cung đình',
      keywords: ['áo thun', 'huế', 'di sản', 'vietnam', 'heritage']
    },
    rating: {
      average: 4.8,
      count: 89
    },
    sales: 56,
    views: 750
  },
  {
    name: 'Áo thun Bạch Đằng tinh thần',
    slug: 'ao-thun-bach-dang-tinh-than',
    description: 'Thiết kế mạnh mẽ với hình ảnh chiến binh lịch sử và cọc gỗ Bạch Đằng, tôn vinh chiến thắng lịch sử vẻ vang của dân tộc Việt Nam.',
    shortDescription: 'Áo thun Bạch Đằng với tinh thần lịch sử',
    price: 279000,
    originalPrice: 350000,
    images: [
      {
        url: '/images/aothuntest/aothun6.webp',
        alt: 'Áo thun Bạch Đằng tinh thần',
        isPrimary: true
      }
    ],
    category: null,
    brand: 'Vietnam Heritage Collection',
    sku: 'VHC-BACHDANG-006',
    variants: [
      {
        name: 'Size',
        options: ['S', 'M', 'L', 'XL'],
        price: 0,
        stock: 28
      },
      {
        name: 'Color',
        options: ['Đỏ', 'Vàng', 'Trắng'],
        price: 0,
        stock: 28
      }
    ],
    stock: 112,
    inStock: true,
    weight: 200,
    dimensions: {
      length: 70,
      width: 50,
      height: 2
    },
    tags: ['bạch đằng', 'lịch sử', 'chiến thắng', 'heritage', 'dân tộc'],
    isActive: true,
    isFeatured: true,
    seo: {
      title: 'Áo thun Bạch Đằng tinh thần - Vietnam Heritage Collection',
      description: 'Áo thun Bạch Đằng với tinh thần lịch sử, tôn vinh chiến thắng vẻ vang',
      keywords: ['áo thun', 'bạch đằng', 'lịch sử', 'vietnam', 'heritage']
    },
    rating: {
      average: 4.9,
      count: 167
    },
    sales: 94,
    views: 1350
  }
];

async function seedVietnamHeritageCollection() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create Vietnam Heritage Collection category
    let heritageCategory = await Category.findOne({ name: 'Vietnam Heritage Collection' });
    if (!heritageCategory) {
      heritageCategory = new Category({
        name: 'Vietnam Heritage Collection',
        slug: 'vietnam-heritage-collection',
        description: 'Bộ sưu tập áo thun và polo tôn vinh văn hóa và lịch sử Việt Nam',
        icon: '🏛️',
        isActive: true,
        sortOrder: 1,
        seo: {
          title: 'Vietnam Heritage Collection - Bộ sưu tập văn hóa Việt Nam',
          description: 'Khám phá bộ sưu tập áo thun và polo tôn vinh văn hóa, lịch sử và truyền thống Việt Nam',
          keywords: ['vietnam', 'heritage', 'văn hóa', 'lịch sử', 'áo thun', 'polo']
        }
      });
      await heritageCategory.save();
      console.log('Created Vietnam Heritage Collection category');
    }

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Set category for all products
    vietnamHeritageProducts.forEach(product => {
      product.category = heritageCategory._id;
    });

    // Insert Vietnam Heritage Collection products
    const products = await Product.insertMany(vietnamHeritageProducts);
    console.log(`Inserted ${products.length} Vietnam Heritage Collection products`);

    console.log('\nVietnam Heritage Collection Products:');
    products.forEach(product => {
      console.log(`- ${product.name}: ${product.price.toLocaleString('vi-VN')}đ`);
    });

    console.log('\n✅ Vietnam Heritage Collection seeded successfully!');

  } catch (error) {
    console.error('Error seeding Vietnam Heritage Collection:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seedVietnamHeritageCollection();
