# Vietnam T-shirts E-commerce App

## 🚀 Deploy lên Vercel

### Bước 1: Chuẩn bị MongoDB Atlas
1. Tạo tài khoản tại https://cloud.mongodb.com
2. Tạo cluster miễn phí
3. Tạo database user
4. Lấy connection string

### Bước 2: Deploy lên Vercel
1. Push code lên GitHub
2. Vào https://vercel.com
3. Import project từ GitHub
4. Cấu hình Environment Variables:
   ```
   DB_ENVIRONMENT=atlas
   REACT_APP_API_URL=https://yourdomain.com/api
   JWT_SECRET=your-super-secret-jwt-key
   NODE_ENV=production
   ```
5. Deploy!

### Cấu trúc Vercel:
- **Frontend:** Served từ `client/build/`
- **Backend API:** Served từ `server/src/index.js` tại `/api/*`
- **Database:** MongoDB Atlas cloud

### Bước 3: Cấu hình Custom Domain
1. Vào Vercel Dashboard → Project → Settings → Domains
2. Add domain: `yourdomain.com`
3. Cấu hình DNS records theo hướng dẫn
4. SSL sẽ tự động được cấp

### Bước 4: Cập nhật API URLs
Sau khi deploy, cập nhật API base URL trong:
- `client/src/services/api.js`
- `client/src/pages/ProfilePage.jsx`

Thay `http://localhost:5000` thành `https://yourdomain.com`

## 📁 Cấu trúc Project
```
├── client/          # React Frontend
├── server/          # Node.js Backend
├── vercel.json      # Vercel config
└── package.json     # Root package
```

## 🔧 Environment Variables cần thiết
- `MONGODB_ATLAS_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key cho JWT
- `NODE_ENV`: production
- `VNP_TMN_CODE`: VNPay merchant code
- `VNP_HASH_SECRET`: VNPay hash secret
