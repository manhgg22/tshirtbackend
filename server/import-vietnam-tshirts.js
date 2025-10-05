// Script để import dữ liệu vào database vietnam-tshirts
// Chạy: mongosh --file import-vietnam-tshirts.js

use('vietnam-tshirts');

print('🗑️  Xóa dữ liệu cũ...');
db.products.drop();
db.users.drop();
db.designs.drop();
db.orders.drop();

print('📥 Importing dữ liệu vào database vietnam-tshirts...');

// Import products
db.products.insertMany([
  {
    "name": "Áo Thun Tinh Thần Việt Nam",
    "description": "Áo thun cotton cao cấp in hình cờ đỏ sao vàng, thể hiện niềm tự hào dân tộc",
    "price": 199000,
    "category": "Áo thun",
    "image": "https://via.placeholder.com/400x400/dc2626/ffffff?text=Áo+Thun+Việt+Nam",
    "inStock": true,
    "createdAt": new Date()
  },
  {
    "name": "Hoodie Cờ Đỏ Sao Vàng",
    "description": "Hoodie ấm áp với thiết kế cờ đỏ sao vàng nổi bật, phù hợp mùa đông",
    "price": 399000,
    "category": "Hoodie",
    "image": "https://via.placeholder.com/400x400/059669/ffffff?text=Hoodie+Việt+Nam",
    "inStock": true,
    "createdAt": new Date()
  },
  {
    "name": "Áo Dài Cách Tân Hiện Đại",
    "description": "Áo dài cách tân kết hợp truyền thống và hiện đại, phù hợp mọi dịp",
    "price": 599000,
    "category": "Áo dài cách tân",
    "image": "https://via.placeholder.com/400x400/7c3aed/ffffff?text=Áo+Dài+Cách+Tân",
    "inStock": true,
    "createdAt": new Date()
  },
  {
    "name": "Áo Thun Hoa Sen Việt",
    "description": "Áo thun in hình hoa sen - quốc hoa Việt Nam, thanh lịch và ý nghĩa",
    "price": 179000,
    "category": "Áo thun",
    "image": "https://via.placeholder.com/400x400/eab308/ffffff?text=Áo+Thun+Hoa+Sen",
    "inStock": true,
    "createdAt": new Date()
  },
  {
    "name": "Hoodie Chữ S Việt Nam",
    "description": "Hoodie với thiết kế chữ S hình dáng Việt Nam độc đáo và sáng tạo",
    "price": 349000,
    "category": "Hoodie",
    "image": "https://via.placeholder.com/400x400/374151/ffffff?text=Hoodie+Chữ+S",
    "inStock": true,
    "createdAt": new Date()
  },
  {
    "name": "Túi Vải Canvas Việt Nam",
    "description": "Túi vải canvas thân thiện môi trường với in hình biểu tượng Việt Nam",
    "price": 89000,
    "category": "Phụ kiện",
    "image": "https://via.placeholder.com/400x400/16a34a/ffffff?text=Túi+Vải+Canvas",
    "inStock": true,
    "createdAt": new Date()
  },
  {
    "name": "Áo Thun Rồng Việt",
    "description": "Áo thun với hình rồng Việt Nam truyền thống, mạnh mẽ và uy nghiêm",
    "price": 229000,
    "category": "Áo thun",
    "image": "https://via.placeholder.com/400x400/1e40af/ffffff?text=Áo+Thun+Rồng",
    "inStock": true,
    "createdAt": new Date()
  },
  {
    "name": "Hoodie Chùa Một Cột",
    "description": "Hoodie với thiết kế chùa Một Cột - biểu tượng văn hóa Hà Nội",
    "price": 429000,
    "category": "Hoodie",
    "image": "https://via.placeholder.com/400x400/0891b2/ffffff?text=Hoodie+Chùa+Một+Cột",
    "inStock": true,
    "createdAt": new Date()
  },
  {
    "name": "Áo Thun Phở Việt",
    "description": "Áo thun với thiết kế phở - món ăn đặc trưng của Việt Nam",
    "price": 189000,
    "category": "Áo thun",
    "image": "https://via.placeholder.com/400x400/f59e0b/ffffff?text=Áo+Thun+Phở",
    "inStock": true,
    "createdAt": new Date()
  },
  {
    "name": "Hoodie Cầu Vàng Đà Nẵng",
    "description": "Hoodie với thiết kế Cầu Vàng - điểm đến nổi tiếng của Đà Nẵng",
    "price": 459000,
    "category": "Hoodie",
    "image": "https://via.placeholder.com/400x400/fbbf24/ffffff?text=Hoodie+Cầu+Vàng",
    "inStock": true,
    "createdAt": new Date()
  },
  {
    "name": "Áo Thun Bánh Mì Việt",
    "description": "Áo thun với thiết kế bánh mì - món ăn đường phố nổi tiếng",
    "price": 169000,
    "category": "Áo thun",
    "image": "https://via.placeholder.com/400x400/84cc16/ffffff?text=Áo+Thun+Bánh+Mì",
    "inStock": true,
    "createdAt": new Date()
  },
  {
    "name": "Hoodie Sapa Việt Nam",
    "description": "Hoodie với thiết kế ruộng bậc thang Sapa - cảnh đẹp miền núi",
    "price": 389000,
    "category": "Hoodie",
    "image": "https://via.placeholder.com/400x400/22c55e/ffffff?text=Hoodie+Sapa",
    "inStock": true,
    "createdAt": new Date()
  },
  {
    "name": "Mũ Lưỡi Trai Việt Nam",
    "description": "Mũ lưỡi trai với logo cờ đỏ sao vàng, phong cách trẻ trung",
    "price": 129000,
    "category": "Phụ kiện",
    "image": "https://via.placeholder.com/400x400/ef4444/ffffff?text=Mũ+Lưỡi+Trai",
    "inStock": true,
    "createdAt": new Date()
  },
  {
    "name": "Túi Đeo Chéo Việt Nam",
    "description": "Túi đeo chéo với thiết kế cờ đỏ sao vàng, tiện lợi và thời trang",
    "price": 159000,
    "category": "Phụ kiện",
    "image": "https://via.placeholder.com/400x400/3b82f6/ffffff?text=Túi+Đeo+Chéo",
    "inStock": true,
    "createdAt": new Date()
  }
]);

print('✅ Đã import ' + db.products.countDocuments() + ' sản phẩm');

// Import users
db.users.insertMany([
  {
    "name": "Admin User",
    "email": "admin@vietnam-tshirts.com",
    "password": "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J8K8K8K",
    "role": "admin",
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Nguyễn Văn An",
    "email": "an.nguyen@email.com",
    "password": "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J8K8K8K",
    "role": "user",
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Trần Thị Bình",
    "email": "binh.tran@email.com",
    "password": "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J8K8K8K",
    "role": "user",
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Lê Minh Cường",
    "email": "cuong.le@email.com",
    "password": "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J8K8K8K",
    "role": "user",
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Phạm Thị Dung",
    "email": "dung.pham@email.com",
    "password": "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J8K8K8K",
    "role": "user",
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Hoàng Văn Em",
    "email": "em.hoang@email.com",
    "password": "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J8K8K8K",
    "role": "user",
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Vũ Thị Phương",
    "email": "phuong.vu@email.com",
    "password": "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J8K8K8K",
    "role": "user",
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Đặng Minh Giang",
    "email": "giang.dang@email.com",
    "password": "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J8K8K8K",
    "role": "user",
    "createdAt": new Date(),
    "updatedAt": new Date()
  }
]);

print('✅ Đã import ' + db.users.countDocuments() + ' người dùng');

// Lấy user IDs để tạo designs và orders
var users = db.users.find().toArray();
var products = db.products.find().toArray();

// Import designs
db.designs.insertMany([
  {
    "userId": users[1]._id,
    "name": "Thiết kế Cờ Đỏ Sao Vàng",
    "image": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2ZmZmZmZiIvPjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZGEyNTFkIiBmb250LXNpemU9IjI0Ij5WSUVUIE5BTTwvdGV4dD48dGV4dCB4PSIyMDAiIHk9IjE1MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIzMiI+4p2VPC90ZXh0Pjwvc3ZnPg==",
    "isPublic": true,
    "createdAt": new Date()
  },
  {
    "userId": users[2]._id,
    "name": "Thiết kế Hoa Sen Truyền Thống",
    "image": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2ZmZmZmZiIvPjx0ZXh0IHg9IjIwMCIgeT0iMTgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMDU5NjY5IiBmb250LXNpemU9IjIwIj5IT0EgU0VOPC90ZXh0Pjx0ZXh0IHg9IjIwMCIgeT0iMTIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjQwIj7wn5GRPC90ZXh0Pjwvc3ZnPg==",
    "isPublic": true,
    "createdAt": new Date()
  },
  {
    "userId": users[3]._id,
    "name": "Thiết kế Phở Việt Nam",
    "image": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2ZmZmZmZiIvPjx0ZXh0IHg9IjIwMCIgeT0iMjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZjU5ZTBiIiBmb250LXNpemU9IjIyIj5QSE8gVklFVDwvdGV4dD48dGV4dCB4PSIyMDAiIHk9IjE0MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIzNSI+8J+NuDwvdGV4dD48L3N2Zz4=",
    "isPublic": true,
    "createdAt": new Date()
  },
  {
    "userId": users[4]._id,
    "name": "Thiết kế Bánh Mì Sài Gòn",
    "image": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2ZmZmZmZiIvPjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjODRjYzE2IiBmb250LXNpemU9IjIwIj5CwU5IIE3IgTwvdGV4dD48dGV4dCB4PSIyMDAiIHk9IjEzMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIzNSI+8J+WtjwvdGV4dD48L3N2Zz4=",
    "isPublic": true,
    "createdAt": new Date()
  },
  {
    "userId": users[5]._id,
    "name": "Thiết kế Rồng Việt",
    "image": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2ZmZmZmZiIvPjx0ZXh0IHg9IjIwMCIgeT0iMjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMWU0MGFmIiBmb250LXNpemU9IjIyIj5Sw5hORyBWSUVUPC90ZXh0Pjx0ZXh0IHg9IjIwMCIgeT0iMTQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjM1Ij7wn5CRPC90ZXh0Pjwvc3ZnPg==",
    "isPublic": true,
    "createdAt": new Date()
  },
  {
    "userId": users[6]._id,
    "name": "Thiết kế Chùa Một Cột",
    "image": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2ZmZmZmZiIvPjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMDg5MWIyIiBmb250LXNpemU9IjIyIj5DSFVBIE3IgVCBDT1Q8L3RleHQ+PHRleHQgeD0iMjAwIiB5PSIxNDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMzUiPuKdpDwvdGV4dD48L3N2Zz4=",
    "isPublic": true,
    "createdAt": new Date()
  },
  {
    "userId": users[7]._id,
    "name": "Thiết kế Cầu Vàng",
    "image": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2ZmZmZmZiIvPjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmJiZjI0IiBmb250LXNpemU9IjIyIj5Dw5VVIETDuE5HPC90ZXh0Pjx0ZXh0IHg9IjIwMCIgeT0iMTQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjM1Ij7wn5CQPC90ZXh0Pjwvc3ZnPg==",
    "isPublic": true,
    "createdAt": new Date()
  }
]);

print('✅ Đã import ' + db.designs.countDocuments() + ' thiết kế');

// Lấy design IDs để tạo orders
var designs = db.designs.find().toArray();

// Import orders
var orderData = [
  {
    "items": [
      {
        "quantity": 2,
        "price": 199000
      }
    ],
    "total": 398000,
    "status": "delivered",
    "shippingAddress": {
      "street": "123 Đường Lê Lợi",
      "city": "Hà Nội",
      "state": "Hà Nội",
      "zipCode": "100000",
      "country": "Việt Nam"
    },
    "orderCode": "ORD001",
    "confirmedAt": new Date('2024-01-15'),
    "createdAt": new Date('2024-01-10')
  },
  {
    "items": [
      {
        "quantity": 1,
        "price": 399000
      },
      {
        "quantity": 1,
        "price": 229000
      }
    ],
    "total": 628000,
    "status": "processing",
    "shippingAddress": {
      "street": "456 Đường Nguyễn Huệ",
      "city": "TP. Hồ Chí Minh",
      "state": "TP. Hồ Chí Minh",
      "zipCode": "700000",
      "country": "Việt Nam"
    },
    "orderCode": "ORD002",
    "confirmedAt": new Date('2024-01-20'),
    "createdAt": new Date('2024-01-18')
  },
  {
    "items": [
      {
        "quantity": 1,
        "price": 599000
      }
    ],
    "total": 599000,
    "status": "shipped",
    "shippingAddress": {
      "street": "789 Đường Trần Hưng Đạo",
      "city": "Đà Nẵng",
      "state": "Đà Nẵng",
      "zipCode": "500000",
      "country": "Việt Nam"
    },
    "orderCode": "ORD003",
    "confirmedAt": new Date('2024-01-22'),
    "createdAt": new Date('2024-01-20')
  },
  {
    "items": [
      {
        "quantity": 3,
        "price": 189000
      }
    ],
    "total": 567000,
    "status": "pending",
    "shippingAddress": {
      "street": "321 Đường Hùng Vương",
      "city": "Huế",
      "state": "Thừa Thiên Huế",
      "zipCode": "530000",
      "country": "Việt Nam"
    },
    "orderCode": "ORD004",
    "createdAt": new Date('2024-01-25')
  },
  {
    "items": [
      {
        "quantity": 1,
        "price": 459000
      },
      {
        "quantity": 2,
        "price": 129000
      }
    ],
    "total": 717000,
    "status": "delivered",
    "shippingAddress": {
      "street": "654 Đường Lý Thường Kiệt",
      "city": "Cần Thơ",
      "state": "Cần Thơ",
      "zipCode": "900000",
      "country": "Việt Nam"
    },
    "orderCode": "ORD005",
    "confirmedAt": new Date('2024-01-12'),
    "createdAt": new Date('2024-01-08')
  }
];

// Thêm userId cho từng order
for (var i = 0; i < orderData.length; i++) {
  orderData[i].userId = users[i + 1]._id;
}

db.orders.insertMany(orderData);

print('✅ Đã import ' + db.orders.countDocuments() + ' đơn hàng');

print('\n🎉 HOÀN THÀNH IMPORT DỮ LIỆU VÀO DATABASE vietnam-tshirts!');
print('\n📊 TỔNG QUAN:');
print('- Sản phẩm: ' + db.products.countDocuments());
print('- Người dùng: ' + db.users.countDocuments());
print('- Thiết kế: ' + db.designs.countDocuments());
print('- Đơn hàng: ' + db.orders.countDocuments());

print('\n🔑 TÀI KHOẢN TEST:');
print('Admin: admin@vietnam-tshirts.com / admin123');
print('User: an.nguyen@email.com / user123');
print('User: binh.tran@email.com / user123');
print('User: cuong.le@email.com / user123');
print('User: dung.pham@email.com / user123');

print('\n✅ Dữ liệu đã sẵn sàng để test ứng dụng!');
