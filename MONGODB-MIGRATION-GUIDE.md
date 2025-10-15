# 🚀 Hướng dẫn Migrate MongoDB Local → Atlas Cloud

## ✅ **Bước 1: Data đã được export thành công!**

Files backup đã được tạo trong `server/mongodb-backup/`:
- ✅ `users.json` - 3 users
- ✅ `products.json` - 4 products  
- ✅ `orders.json` - 2 orders
- ✅ `categories.json` - 2 categories

## 🌐 **Bước 2: Tạo MongoDB Atlas Cluster**

### **2.1. Tạo account Atlas:**
1. **Vào https://cloud.mongodb.com**
2. **Sign up** miễn phí
3. **Chọn "Build a Database"**

### **2.2. Cấu hình Cluster:**
```
Cluster Type: Shared (Free)
Provider: AWS
Region: Asia Pacific (Singapore) ap-southeast-1
Cluster Name: vietnam-tshirts-cluster
```

### **2.3. Tạo Database User:**
```
Username: vietnam-tshirts-user
Password: [tạo password mạnh]
Database User Privileges: Read and write to any database
```

### **2.4. Network Access:**
```
IP Access List: Add Current IP Address
Hoặc: 0.0.0.0/0 (cho phép từ mọi nơi - chỉ dùng cho test)
```

### **2.5. Lấy Connection String:**
```
1. Click "Connect" trên cluster
2. Chọn "Connect your application"
3. Copy connection string:
   mongodb+srv://vietnam-tshirts-user:<password>@vietnam-tshirts-cluster.xxxxx.mongodb.net/vietnam-tshirts?retryWrites=true&w=majority
```

## 📥 **Bước 3: Import Data vào Atlas**

### **3.1. Cập nhật connection string:**
Sửa file `server/import-to-atlas.js`:
```javascript
const atlasMongoURI = 'mongodb+srv://vietnam-tshirts-user:YOUR_PASSWORD@vietnam-tshirts-cluster.xxxxx.mongodb.net/vietnam-tshirts?retryWrites=true&w=majority';
```

### **3.2. Chạy import script:**
```bash
cd server
node import-to-atlas.js
```

## 🔧 **Bước 4: Cập nhật Environment Variables**

### **4.1. Local development:**
Tạo file `.env` trong thư mục `server/`:
```
MONGODB_ATLAS_URI=mongodb+srv://vietnam-tshirts-user:YOUR_PASSWORD@vietnam-tshirts-cluster.xxxxx.mongodb.net/vietnam-tshirts?retryWrites=true&w=majority
NODE_ENV=development
```

### **4.2. Vercel deployment:**
Trong Vercel Dashboard → Project → Settings → Environment Variables:
```
MONGODB_ATLAS_URI=mongodb+srv://vietnam-tshirts-user:YOUR_PASSWORD@vietnam-tshirts-cluster.xxxxx.mongodb.net/vietnam-tshirts?retryWrites=true&w=majority
REACT_APP_API_URL=https://yourdomain.com/api
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=production
```

## 🎯 **Bước 5: Test kết nối**

### **5.1. Test local:**
```bash
cd server
npm run dev
```

### **5.2. Test production:**
Deploy lên Vercel và test các chức năng:
- ✅ Login/Register
- ✅ Profile page
- ✅ Products
- ✅ Orders

## 📊 **Kết quả mong đợi:**

Sau khi import thành công, bạn sẽ có:
- ✅ **3 users** với đầy đủ thông tin
- ✅ **4 products** áo thun anh hùng
- ✅ **2 orders** với trạng thái khác nhau
- ✅ **2 categories** cho sản phẩm
- ✅ **Database cloud** có thể truy cập từ mọi nơi

## 🚨 **Lưu ý quan trọng:**

1. **Bảo mật password:** Không commit password vào Git
2. **Network access:** Chỉ cho phép IP cần thiết
3. **Backup:** Atlas tự động backup, nhưng nên export định kỳ
4. **Monitoring:** Theo dõi usage để tránh vượt free tier

## 🆘 **Troubleshooting:**

### **Lỗi connection:**
- Kiểm tra password có đúng không
- Kiểm tra Network Access có cho phép IP hiện tại
- Kiểm tra connection string có đúng format

### **Lỗi import:**
- Kiểm tra file JSON có đúng format
- Kiểm tra models có match với schema
- Kiểm tra foreign key references
