// Database Export - Vietnam Heritage Collection
// Generated on: 2025-10-16T09:07:06.479Z
// Total records: 22

export const databaseData = {
  users: [
  {
    "preferences": {
      "notifications": {
        "email": true,
        "sms": true,
        "push": false
      },
      "newsletter": true
    },
    "_id": "68ef1236e958e49d602c8014",
    "name": "Nguyễn Văn An",
    "email": "nguyenvanan@email.com",
    "password": "$2b$12$YbEiTKXBAM50p6OQT6UDdupv5z3.53ahM.Vj0fB.cnIWmuaTmm2b.",
    "phone": "0123456789",
    "avatar": "",
    "role": "user",
    "isEmailVerified": true,
    "isPhoneVerified": true,
    "addresses": [
      {
        "type": "home",
        "name": "Nguyễn Văn An",
        "phone": "0123456789",
        "address": "123 Đường ABC, Phường Dịch Vọng",
        "city": "Hà Nội",
        "district": "Cầu Giấy",
        "ward": "Dịch Vọng",
        "zipcode": "100000",
        "isDefault": true,
        "_id": "68ef1236e958e49d602c8015"
      },
      {
        "type": "work",
        "name": "Nguyễn Văn An",
        "phone": "0123456789",
        "address": "456 Tòa nhà XYZ, Phường Bến Nghé",
        "city": "TP. Hồ Chí Minh",
        "district": "Quận 1",
        "ward": "Phường Bến Nghé",
        "zipcode": "700000",
        "isDefault": false,
        "_id": "68ef1236e958e49d602c8016"
      }
    ],
    "loginAttempts": 0,
    "__v": 0,
    "createdAt": "2025-10-15T03:17:10.401Z",
    "updatedAt": "2025-10-15T03:17:10.449Z"
  },
  {
    "preferences": {
      "notifications": {
        "email": true,
        "sms": false,
        "push": true
      },
      "newsletter": false
    },
    "_id": "68ef1236e958e49d602c8017",
    "name": "Trần Thị Bình",
    "email": "tranthibinh@email.com",
    "password": "$2b$12$5KR8AwUmDKHWRmoyGCXXBeF.JdgHFOA6hDrtLdPaUASvNffpjO2Ba",
    "phone": "0987654321",
    "avatar": "",
    "role": "user",
    "isEmailVerified": true,
    "isPhoneVerified": true,
    "addresses": [
      {
        "type": "home",
        "name": "Trần Thị Bình",
        "phone": "0987654321",
        "address": "789 Đường DEF, Phường Hải Châu I",
        "city": "Đà Nẵng",
        "district": "Hải Châu",
        "ward": "Phường Hải Châu I",
        "zipcode": "500000",
        "isDefault": true,
        "_id": "68ef1236e958e49d602c8018"
      }
    ],
    "loginAttempts": 0,
    "__v": 0,
    "createdAt": "2025-10-15T03:17:10.402Z",
    "updatedAt": "2025-10-15T03:17:10.402Z"
  },
  {
    "preferences": {
      "notifications": {
        "email": false,
        "sms": true,
        "push": true
      },
      "newsletter": true
    },
    "_id": "68ef1236e958e49d602c8019",
    "name": "Lê Văn Cường",
    "email": "levancuong@email.com",
    "password": "$2b$12$J1hOvNQeVLJgysqtUy.FWeK6m54MF4f.CBCoA8pJ/jXy0Q47UkTdG",
    "phone": "0369852147",
    "avatar": "",
    "role": "user",
    "isEmailVerified": false,
    "isPhoneVerified": true,
    "addresses": [
      {
        "type": "home",
        "name": "Lê Văn Cường",
        "phone": "0369852147",
        "address": "321 Đường GHI, Phường Máy Chai",
        "city": "Hải Phòng",
        "district": "Ngô Quyền",
        "ward": "Phường Máy Chai",
        "zipcode": "180000",
        "isDefault": true,
        "_id": "68ef1236e958e49d602c801a"
      }
    ],
    "loginAttempts": 0,
    "__v": 0,
    "createdAt": "2025-10-15T03:17:10.402Z",
    "updatedAt": "2025-10-15T03:17:10.402Z"
  }
],
  products: [
  {
    "dimensions": {
      "length": 70,
      "width": 50,
      "height": 2
    },
    "seo": {
      "title": "Áo thun Cà phê Việt - Vietnam Heritage Collection",
      "description": "Áo thun cà phê Việt Nam với thiết kế vintage độc đáo, chất liệu cotton cao cấp",
      "keywords": [
        "áo thun",
        "cà phê việt",
        "vietnam",
        "heritage",
        "vintage"
      ]
    },
    "rating": {
      "average": 4.8,
      "count": 156
    },
    "_id": "68ef26ae44795b214650326b",
    "name": "Áo thun Cà phê Việt",
    "slug": "ao-thun-ca-phe-viet",
    "description": "Áo thun được thiết kế đặc biệt tôn vinh văn hóa cà phê Việt Nam với hình ảnh vintage café và slogan \"Cà phê Việt\". Chất liệu cotton 100% mềm mại, thoáng mát.",
    "shortDescription": "Áo thun cà phê Việt Nam với thiết kế vintage độc đáo",
    "price": 279000,
    "originalPrice": 350000,
    "images": [
      {
        "url": "/images/aothuntest/aothun1.webp",
        "alt": "Áo thun Cà phê Việt",
        "isPrimary": true,
        "_id": "68ef26ae44795b214650326c"
      }
    ],
    "category": "68ef26ae44795b2146503268",
    "brand": "Vietnam Heritage Collection",
    "sku": "VHC-CAFE-001",
    "variants": [
      {
        "name": "Size",
        "options": [
          "S",
          "M",
          "L",
          "XL"
        ],
        "price": 0,
        "stock": 25,
        "_id": "68ef26ae44795b214650326d"
      },
      {
        "name": "Color",
        "options": [
          "Trắng",
          "Đen",
          "Xám"
        ],
        "price": 0,
        "stock": 25,
        "_id": "68ef26ae44795b214650326e"
      }
    ],
    "stock": 100,
    "inStock": true,
    "weight": 200,
    "tags": [
      "cà phê",
      "vietnam",
      "vintage",
      "heritage",
      "culture"
    ],
    "isActive": true,
    "isFeatured": true,
    "views": 1240,
    "sales": 89,
    "__v": 0,
    "createdAt": "2025-10-15T04:44:30.710Z",
    "updatedAt": "2025-10-15T04:44:30.710Z"
  },
  {
    "dimensions": {
      "length": 70,
      "width": 50,
      "height": 2
    },
    "seo": {
      "title": "Áo thun Phở Việt Nam - Vietnam Heritage Collection",
      "description": "Áo thun Phở Việt Nam với khẩu hiệu quốc gia, thể hiện niềm tự hào dân tộc",
      "keywords": [
        "áo thun",
        "phở việt",
        "vietnam",
        "heritage",
        "quốc gia"
      ]
    },
    "rating": {
      "average": 4.9,
      "count": 203
    },
    "_id": "68ef26ae44795b214650326f",
    "name": "Áo thun Phở Việt Nam",
    "slug": "ao-thun-pho-viet-nam",
    "description": "Áo thun thể hiện niềm tự hào dân tộc với typography đỏ \"Độc lập - Tự do - Hạnh phúc\" - khẩu hiệu quốc gia Việt Nam. Thiết kế tôn vinh món ăn quốc hồn quốc túy.",
    "shortDescription": "Áo thun Phở Việt Nam với khẩu hiệu quốc gia",
    "price": 249000,
    "originalPrice": 320000,
    "images": [
      {
        "url": "/images/aothuntest/aothun2.webp",
        "alt": "Áo thun Phở Việt Nam",
        "isPrimary": true,
        "_id": "68ef26ae44795b2146503270"
      }
    ],
    "category": "68ef26ae44795b2146503268",
    "brand": "Vietnam Heritage Collection",
    "sku": "VHC-PHO-002",
    "variants": [
      {
        "name": "Size",
        "options": [
          "S",
          "M",
          "L",
          "XL"
        ],
        "price": 0,
        "stock": 30,
        "_id": "68ef26ae44795b2146503271"
      },
      {
        "name": "Color",
        "options": [
          "Trắng",
          "Đen",
          "Đỏ"
        ],
        "price": 0,
        "stock": 30,
        "_id": "68ef26ae44795b2146503272"
      }
    ],
    "stock": 120,
    "inStock": true,
    "weight": 200,
    "tags": [
      "phở",
      "vietnam",
      "quốc gia",
      "heritage",
      "typography"
    ],
    "isActive": true,
    "isFeatured": true,
    "views": 1580,
    "sales": 112,
    "__v": 0,
    "createdAt": "2025-10-15T04:44:30.711Z",
    "updatedAt": "2025-10-15T04:44:30.711Z"
  },
  {
    "dimensions": {
      "length": 75,
      "width": 55,
      "height": 2
    },
    "seo": {
      "title": "Áo polo Hà Nội phố cổ - Vietnam Heritage Collection",
      "description": "Áo polo Hà Nội phố cổ với thiết kế sang trọng, chất liệu cao cấp",
      "keywords": [
        "áo polo",
        "hà nội",
        "phố cổ",
        "vietnam",
        "heritage"
      ]
    },
    "rating": {
      "average": 4.7,
      "count": 98
    },
    "_id": "68ef26ae44795b2146503273",
    "name": "Áo polo Hà Nội phố cổ",
    "slug": "ao-polo-ha-noi-pho-co",
    "description": "Áo polo trắng với typography vàng-đỏ \"VIỆT NAM\" phản ánh văn hóa phố cổ Hà Nội. Chất liệu polo cao cấp, form dáng sang trọng.",
    "shortDescription": "Áo polo Hà Nội phố cổ với thiết kế sang trọng",
    "price": 450000,
    "originalPrice": 550000,
    "images": [
      {
        "url": "/images/aothuntest/aothun3.webp",
        "alt": "Áo polo Hà Nội phố cổ",
        "isPrimary": true,
        "_id": "68ef26ae44795b2146503274"
      }
    ],
    "category": "68ef26ae44795b2146503268",
    "brand": "Vietnam Heritage Collection",
    "sku": "VHC-HANOI-003",
    "variants": [
      {
        "name": "Size",
        "options": [
          "S",
          "M",
          "L",
          "XL",
          "XXL"
        ],
        "price": 0,
        "stock": 20,
        "_id": "68ef26ae44795b2146503275"
      },
      {
        "name": "Color",
        "options": [
          "Trắng",
          "Xanh navy",
          "Đen"
        ],
        "price": 0,
        "stock": 20,
        "_id": "68ef26ae44795b2146503276"
      }
    ],
    "stock": 100,
    "inStock": true,
    "weight": 250,
    "tags": [
      "hà nội",
      "phố cổ",
      "polo",
      "heritage",
      "sang trọng"
    ],
    "isActive": true,
    "isFeatured": true,
    "views": 890,
    "sales": 67,
    "__v": 0,
    "createdAt": "2025-10-15T04:44:30.711Z",
    "updatedAt": "2025-10-15T04:44:30.711Z"
  },
  {
    "dimensions": {
      "length": 70,
      "width": 50,
      "height": 2
    },
    "seo": {
      "title": "Áo thun Sài Gòn đêm - Vietnam Heritage Collection",
      "description": "Áo thun Sài Gòn đêm với thiết kế năng động, thể hiện sự sôi động của thành phố",
      "keywords": [
        "áo thun",
        "sài gòn",
        "đêm",
        "vietnam",
        "heritage"
      ]
    },
    "rating": {
      "average": 4.6,
      "count": 134
    },
    "_id": "68ef26ae44795b2146503277",
    "name": "Áo thun Sài Gòn đêm",
    "slug": "ao-thun-sai-gon-dem",
    "description": "Thiết kế năng động thể hiện sự sôi động của Sài Gòn về đêm với hình ảnh xe máy, quán ăn đêm và ánh đèn neon. Phong cách trẻ trung, hiện đại.",
    "shortDescription": "Áo thun Sài Gòn đêm với thiết kế năng động",
    "price": 299000,
    "originalPrice": 380000,
    "images": [
      {
        "url": "/images/aothuntest/aothun4.webp",
        "alt": "Áo thun Sài Gòn đêm",
        "isPrimary": true,
        "_id": "68ef26ae44795b2146503278"
      }
    ],
    "category": "68ef26ae44795b2146503268",
    "brand": "Vietnam Heritage Collection",
    "sku": "VHC-SAIGON-004",
    "variants": [
      {
        "name": "Size",
        "options": [
          "S",
          "M",
          "L",
          "XL"
        ],
        "price": 0,
        "stock": 25,
        "_id": "68ef26ae44795b2146503279"
      },
      {
        "name": "Color",
        "options": [
          "Đen",
          "Xám đậm",
          "Navy"
        ],
        "price": 0,
        "stock": 25,
        "_id": "68ef26ae44795b214650327a"
      }
    ],
    "stock": 100,
    "inStock": true,
    "weight": 200,
    "tags": [
      "sài gòn",
      "đêm",
      "năng động",
      "heritage",
      "hiện đại"
    ],
    "isActive": true,
    "isFeatured": true,
    "views": 1104,
    "sales": 78,
    "__v": 0,
    "createdAt": "2025-10-15T04:44:30.712Z",
    "updatedAt": "2025-10-15T06:52:53.804Z"
  },
  {
    "dimensions": {
      "length": 70,
      "width": 50,
      "height": 2
    },
    "seo": {
      "title": "Áo thun Huế di sản - Vietnam Heritage Collection",
      "description": "Áo thun Huế di sản với họa tiết hoàng cung, tôn vinh văn hóa cung đình",
      "keywords": [
        "áo thun",
        "huế",
        "di sản",
        "vietnam",
        "heritage"
      ]
    },
    "rating": {
      "average": 4.8,
      "count": 89
    },
    "_id": "68ef26ae44795b214650327b",
    "name": "Áo thun Huế di sản",
    "slug": "ao-thun-hue-di-san",
    "description": "Thiết kế tinh tế với họa tiết hoàng cung Huế trên nền pastel nhẹ nhàng. Tôn vinh di sản văn hóa cung đình và kiến trúc truyền thống.",
    "shortDescription": "Áo thun Huế di sản với họa tiết hoàng cung",
    "price": 329000,
    "originalPrice": 420000,
    "images": [
      {
        "url": "/images/aothuntest/aothun5.webp",
        "alt": "Áo thun Huế di sản",
        "isPrimary": true,
        "_id": "68ef26ae44795b214650327c"
      }
    ],
    "category": "68ef26ae44795b2146503268",
    "brand": "Vietnam Heritage Collection",
    "sku": "VHC-HUE-005",
    "variants": [
      {
        "name": "Size",
        "options": [
          "S",
          "M",
          "L",
          "XL"
        ],
        "price": 0,
        "stock": 22,
        "_id": "68ef26ae44795b214650327d"
      },
      {
        "name": "Color",
        "options": [
          "Trắng",
          "Kem",
          "Xanh nhạt"
        ],
        "price": 0,
        "stock": 22,
        "_id": "68ef26ae44795b214650327e"
      }
    ],
    "stock": 88,
    "inStock": true,
    "weight": 200,
    "tags": [
      "huế",
      "di sản",
      "hoàng cung",
      "heritage",
      "truyền thống"
    ],
    "isActive": true,
    "isFeatured": true,
    "views": 754,
    "sales": 56,
    "__v": 0,
    "createdAt": "2025-10-15T04:44:30.712Z",
    "updatedAt": "2025-10-15T06:22:14.178Z"
  },
  {
    "dimensions": {
      "length": 70,
      "width": 50,
      "height": 2
    },
    "seo": {
      "title": "Áo thun Bạch Đằng tinh thần - Vietnam Heritage Collection",
      "description": "Áo thun Bạch Đằng với tinh thần lịch sử, tôn vinh chiến thắng vẻ vang",
      "keywords": [
        "áo thun",
        "bạch đằng",
        "lịch sử",
        "vietnam",
        "heritage"
      ]
    },
    "rating": {
      "average": 4.9,
      "count": 167
    },
    "_id": "68ef26ae44795b214650327f",
    "name": "Áo thun Bạch Đằng tinh thần",
    "slug": "ao-thun-bach-dang-tinh-than",
    "description": "Thiết kế mạnh mẽ với hình ảnh chiến binh lịch sử và cọc gỗ Bạch Đằng, tôn vinh chiến thắng lịch sử vẻ vang của dân tộc Việt Nam.",
    "shortDescription": "Áo thun Bạch Đằng với tinh thần lịch sử",
    "price": 279000,
    "originalPrice": 350000,
    "images": [
      {
        "url": "/images/aothuntest/aothun6.webp",
        "alt": "Áo thun Bạch Đằng tinh thần",
        "isPrimary": true,
        "_id": "68ef26ae44795b2146503280"
      }
    ],
    "category": "68ef26ae44795b2146503268",
    "brand": "Vietnam Heritage Collection",
    "sku": "VHC-BACHDANG-006",
    "variants": [
      {
        "name": "Size",
        "options": [
          "S",
          "M",
          "L",
          "XL"
        ],
        "price": 0,
        "stock": 28,
        "_id": "68ef26ae44795b2146503281"
      },
      {
        "name": "Color",
        "options": [
          "Đỏ",
          "Vàng",
          "Trắng"
        ],
        "price": 0,
        "stock": 28,
        "_id": "68ef26ae44795b2146503282"
      }
    ],
    "stock": 112,
    "inStock": true,
    "weight": 200,
    "tags": [
      "bạch đằng",
      "lịch sử",
      "chiến thắng",
      "heritage",
      "dân tộc"
    ],
    "isActive": true,
    "isFeatured": true,
    "views": 1350,
    "sales": 94,
    "__v": 0,
    "createdAt": "2025-10-15T04:44:30.712Z",
    "updatedAt": "2025-10-15T04:44:30.712Z"
  }
],
  orders: [
  {
    "qrCode": {
      "bankAccount": "0359937294",
      "bankName": "TPBank"
    },
    "customerInfo": {
      "name": "Nguyễn Văn An",
      "phone": "0123456789",
      "email": "nguyenvanan@email.com",
      "address": "123 Đường ABC, Phường Dịch Vọng",
      "city": "Hà Nội",
      "district": "Cầu Giấy",
      "zipcode": "100000"
    },
    "shippingAddress": {
      "street": "123 Đường ABC, Phường Dịch Vọng",
      "city": "Hà Nội",
      "state": "Hà Nội",
      "zipCode": "100000",
      "country": "Việt Nam"
    },
    "_id": "68ef1236e958e49d602c8025",
    "userId": "68ef1236e958e49d602c8014",
    "items": [
      {
        "productId": "68ef1236e958e49d602c801c",
        "quantity": 1,
        "price": 299000,
        "_id": "68ef1236e958e49d602c8026"
      },
      {
        "productId": "68ef1236e958e49d602c801e",
        "quantity": 2,
        "price": 299000,
        "_id": "68ef1236e958e49d602c8027"
      }
    ],
    "total": 897000,
    "status": "delivered",
    "paymentStatus": "paid",
    "paymentMethod": "qr_tpbank",
    "orderCode": "ORD-2024-001",
    "shippingMethod": "standard",
    "shippingFee": 0,
    "discountAmount": 0,
    "createdAt": "2025-10-15T03:17:10.434Z",
    "__v": 0
  },
  {
    "qrCode": {
      "bankAccount": "0359937294",
      "bankName": "TPBank"
    },
    "customerInfo": {
      "name": "Nguyễn Văn An",
      "phone": "0123456789",
      "email": "nguyenvanan@email.com",
      "address": "123 Đường ABC, Phường Dịch Vọng",
      "city": "Hà Nội",
      "district": "Cầu Giấy",
      "zipcode": "100000"
    },
    "shippingAddress": {
      "street": "123 Đường ABC, Phường Dịch Vọng",
      "city": "Hà Nội",
      "state": "Hà Nội",
      "zipCode": "100000",
      "country": "Việt Nam"
    },
    "_id": "68ef1236e958e49d602c8028",
    "userId": "68ef1236e958e49d602c8014",
    "items": [
      {
        "productId": "68ef1236e958e49d602c801c",
        "quantity": 1,
        "price": 199000,
        "_id": "68ef1236e958e49d602c8029"
      }
    ],
    "total": 199000,
    "status": "shipped",
    "paymentStatus": "paid",
    "paymentMethod": "bank_transfer",
    "orderCode": "ORD-2024-002",
    "shippingMethod": "standard",
    "shippingFee": 0,
    "discountAmount": 0,
    "createdAt": "2025-10-15T03:17:10.435Z",
    "__v": 0
  },
  {
    "qrCode": {
      "data": "{\"bankAccount\":\"0359937294\",\"bankName\":\"TPBank\",\"accountName\":\"Nguyen Van A\",\"amount\":2842000,\"message\":\"Thanh toan don hang VNMGRMY0BUX5PC3 - 2.842.000 VND\",\"orderCode\":\"VNMGRMY0BUX5PC3\"}",
      "imageUrl": "data:image/png;base64,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",
      "bankAccount": "0359937294",
      "bankName": "TPBank"
    },
    "customerInfo": {
      "name": "Lê Duc Manh",
      "phone": "0987655411",
      "email": "manhgg22@gmail.com",
      "address": "Quận Hà Đông",
      "city": "Tỉnh Phú Thọ",
      "district": "Huyện Tam Nông",
      "note": "GIao hang"
    },
    "shippingAddress": {
      "street": "Quận Hà Đông",
      "city": "Tỉnh Phú Thọ",
      "state": "Huyện Tam Nông",
      "zipCode": "000000",
      "country": "Vietnam"
    },
    "_id": "68ef4514c86cb2a7a870d398",
    "userId": "68ef4514c86cb2a7a870d397",
    "items": [
      {
        "productId": "68e5e102be24b37c21f0bccf",
        "quantity": 1,
        "price": 450000,
        "_id": "68ef4514c86cb2a7a870d399"
      },
      {
        "productId": "68ef26ae44795b2146503277",
        "quantity": 6,
        "price": 299000,
        "_id": "68ef4514c86cb2a7a870d39a"
      },
      {
        "productId": "68ef26ae44795b2146503277",
        "quantity": 2,
        "price": 299000,
        "_id": "68ef4514c86cb2a7a870d39b"
      }
    ],
    "total": 2842000,
    "status": "paid",
    "paymentStatus": "paid",
    "paymentMethod": "qr_tpbank",
    "orderCode": "VNMGRMY0BUX5PC3",
    "shippingMethod": "standard",
    "shippingFee": 0,
    "voucherCode": null,
    "discountAmount": 0,
    "createdAt": "2025-10-15T06:54:12.879Z",
    "__v": 0,
    "paidAt": "2025-10-15T06:55:14.396Z"
  }
],
  categories: [
  {
    "seo": {
      "keywords": []
    },
    "_id": "68ef1236e958e49d602c8011",
    "name": "Anh Hùng Dân Tộc",
    "slug": "anh-hung-dan-toc",
    "description": "Áo thun in hình các anh hùng dân tộc Việt Nam",
    "image": "/images/vuahung.webp",
    "parent": null,
    "level": 0,
    "isActive": true,
    "sortOrder": 0,
    "__v": 0,
    "createdAt": "2025-10-15T03:17:10.358Z",
    "updatedAt": "2025-10-15T03:17:10.358Z"
  },
  {
    "seo": {
      "keywords": []
    },
    "_id": "68ef1236e958e49d602c8012",
    "name": "Văn Hóa Việt Nam",
    "slug": "van-hoa-viet-nam",
    "description": "Áo thun thể hiện văn hóa truyền thống Việt Nam",
    "image": "/images/placeholder.png",
    "parent": null,
    "level": 0,
    "isActive": true,
    "sortOrder": 0,
    "__v": 0,
    "createdAt": "2025-10-15T03:17:10.364Z",
    "updatedAt": "2025-10-15T03:17:10.364Z"
  },
  {
    "seo": {
      "title": "Vietnam Heritage Collection - Bộ sưu tập văn hóa Việt Nam",
      "description": "Khám phá bộ sưu tập áo thun và polo tôn vinh văn hóa, lịch sử và truyền thống Việt Nam",
      "keywords": [
        "vietnam",
        "heritage",
        "văn hóa",
        "lịch sử",
        "áo thun",
        "polo"
      ]
    },
    "_id": "68ef26ae44795b2146503268",
    "name": "Vietnam Heritage Collection",
    "slug": "vietnam-heritage-collection",
    "description": "Bộ sưu tập áo thun và polo tôn vinh văn hóa và lịch sử Việt Nam",
    "icon": "🏛️",
    "parent": null,
    "level": 0,
    "isActive": true,
    "sortOrder": 1,
    "createdAt": "2025-10-15T04:44:30.681Z",
    "updatedAt": "2025-10-15T04:44:30.681Z",
    "__v": 0
  }
],
  designs: [
  {
    "_id": "68e1fec334053bc65ecb0cf8",
    "userId": "68e1fec334053bc65ecb0cf1",
    "name": "Thiết kế Cờ Đỏ Sao Vàng",
    "image": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2ZmZmZmZiIvPjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZGEyNTFkIiBmb250LXNpemU9IjI0Ij5WSUVUIE5BTTwvdGV4dD48dGV4dCB4PSIyMDAiIHk9IjE1MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIzMiI+4p2VPC90ZXh0Pjwvc3ZnPg==",
    "isPublic": true,
    "createdAt": "2025-10-05T05:14:43.292Z"
  },
  {
    "_id": "68e1fec334053bc65ecb0cf9",
    "userId": "68e1fec334053bc65ecb0cf2",
    "name": "Thiết kế Hoa Sen Truyền Thống",
    "image": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2ZmZmZmZiIvPjx0ZXh0IHg9IjIwMCIgeT0iMTgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMDU5NjY5IiBmb250LXNpemU9IjIwIj5IT0EgU0VOPC90ZXh0Pjx0ZXh0IHg9IjIwMCIgeT0iMTIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjQwIj7wn5GRPC90ZXh0Pjwvc3ZnPg==",
    "isPublic": true,
    "createdAt": "2025-10-05T05:14:43.292Z"
  },
  {
    "_id": "68e1fec334053bc65ecb0cfa",
    "userId": "68e1fec334053bc65ecb0cf3",
    "name": "Thiết kế Phở Việt Nam",
    "image": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2ZmZmZmZiIvPjx0ZXh0IHg9IjIwMCIgeT0iMjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZjU5ZTBiIiBmb250LXNpemU9IjIyIj5QSE8gVklFVDwvdGV4dD48dGV4dCB4PSIyMDAiIHk9IjE0MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIzNSI+8J+NuDwvdGV4dD48L3N2Zz4=",
    "isPublic": true,
    "createdAt": "2025-10-05T05:14:43.292Z"
  },
  {
    "_id": "68e1fec334053bc65ecb0cfb",
    "userId": "68e1fec334053bc65ecb0cf4",
    "name": "Thiết kế Bánh Mì Sài Gòn",
    "image": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2ZmZmZmZiIvPjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjODRjYzE2IiBmb250LXNpemU9IjIwIj5CwU5IIE3IgTwvdGV4dD48dGV4dCB4PSIyMDAiIHk9IjEzMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIzNSI+8J+WtjwvdGV4dD48L3N2Zz4=",
    "isPublic": true,
    "createdAt": "2025-10-05T05:14:43.292Z"
  },
  {
    "_id": "68e1fec334053bc65ecb0cfc",
    "userId": "68e1fec334053bc65ecb0cf5",
    "name": "Thiết kế Rồng Việt",
    "image": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2ZmZmZmZiIvPjx0ZXh0IHg9IjIwMCIgeT0iMjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMWU0MGFmIiBmb250LXNpemU9IjIyIj5Sw5hORyBWSUVUPC90ZXh0Pjx0ZXh0IHg9IjIwMCIgeT0iMTQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjM1Ij7wn5CRPC90ZXh0Pjwvc3ZnPg==",
    "isPublic": true,
    "createdAt": "2025-10-05T05:14:43.292Z"
  },
  {
    "_id": "68e1fec334053bc65ecb0cfd",
    "userId": "68e1fec334053bc65ecb0cf6",
    "name": "Thiết kế Chùa Một Cột",
    "image": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2ZmZmZmZiIvPjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMDg5MWIyIiBmb250LXNpemU9IjIyIj5DSFVBIE3IgVCBDT1Q8L3RleHQ+PHRleHQgeD0iMjAwIiB5PSIxNDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMzUiPuKdpDwvdGV4dD48L3N2Zz4=",
    "isPublic": true,
    "createdAt": "2025-10-05T05:14:43.292Z"
  },
  {
    "_id": "68e1fec334053bc65ecb0cfe",
    "userId": "68e1fec334053bc65ecb0cf7",
    "name": "Thiết kế Cầu Vàng",
    "image": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2ZmZmZmZiIvPjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmJiZjI0IiBmb250LXNpemU9IjIyIj5Dw5VVIETDuE5HPC90ZXh0Pjx0ZXh0IHg9IjIwMCIgeT0iMTQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjM1Ij7wn5CQPC90ZXh0Pjwvc3ZnPg==",
    "isPublic": true,
    "createdAt": "2025-10-05T05:14:43.292Z"
  }
],
  reviews: [],
  vouchers: []
};

export const exportInfo = {
  exportDate: '2025-10-16T09:07:06.483Z',
  totalUsers: 3,
  totalProducts: 6,
  totalOrders: 3,
  totalCategories: 3,
  totalDesigns: 7,
  totalReviews: 0,
  totalVouchers: 0,
  totalRecords: 22
};

// Import function for new database
export const importToDatabase = async (mongoose) => {
  try {
    console.log('📥 Starting database import...');
    
    // Import Users
    if (databaseData.users.length > 0) {
      await mongoose.connection.db.collection('users').insertMany(databaseData.users);
      console.log(`✅ Imported ${databaseData.users.length} users`);
    }
    
    // Import Products
    if (databaseData.products.length > 0) {
      await mongoose.connection.db.collection('products').insertMany(databaseData.products);
      console.log(`✅ Imported ${databaseData.products.length} products`);
    }
    
    // Import Orders
    if (databaseData.orders.length > 0) {
      await mongoose.connection.db.collection('orders').insertMany(databaseData.orders);
      console.log(`✅ Imported ${databaseData.orders.length} orders`);
    }
    
    // Import Categories
    if (databaseData.categories.length > 0) {
      await mongoose.connection.db.collection('categories').insertMany(databaseData.categories);
      console.log(`✅ Imported ${databaseData.categories.length} categories`);
    }
    
    // Import Designs
    if (databaseData.designs.length > 0) {
      await mongoose.connection.db.collection('designs').insertMany(databaseData.designs);
      console.log(`✅ Imported ${databaseData.designs.length} designs`);
    }
    
    // Import Reviews
    if (databaseData.reviews.length > 0) {
      await mongoose.connection.db.collection('reviews').insertMany(databaseData.reviews);
      console.log(`✅ Imported ${databaseData.reviews.length} reviews`);
    }
    
    // Import Vouchers
    if (databaseData.vouchers.length > 0) {
      await mongoose.connection.db.collection('vouchers').insertMany(databaseData.vouchers);
      console.log(`✅ Imported ${databaseData.vouchers.length} vouchers`);
    }
    
    console.log('🎉 Database import completed successfully!');
    
  } catch (error) {
    console.error('❌ Import error:', error);
    throw error;
  }
};
