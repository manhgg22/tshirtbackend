# 🔧 Hướng dẫn Import Environment Variables vào Vercel

## 📋 **Các Environment Variables cần thiết:**

### **1. Database Configuration:**
```
Name: DB_ENVIRONMENT
Value: atlas
```

### **2. API Configuration:**
```
Name: REACT_APP_API_URL
Value: https://tshirtbackend.vercel.app/api
```

### **3. Environment:**
```
Name: NODE_ENV
Value: production
```

### **4. JWT Secret:**
```
Name: JWT_SECRET
Value: vietnam-tshirts-super-secret-jwt-key-2024-manhgg22
```

### **5. VNPay Configuration (Optional):**
```
Name: VNP_TMN_CODE
Value: (để trống hoặc thêm merchant code)

Name: VNP_HASH_SECRET
Value: (để trống hoặc thêm hash secret)

Name: VNP_URL
Value: https://sandbox.vnpayment.vn/paymentv2/vpcpay.html

Name: VNP_API
Value: https://sandbox.vnpayment.vn/merchant_webapi/api/transaction

Name: VNP_RETURN_URL
Value: https://tshirtbackend.vercel.app/api/orders/vnpay_return
```

### **6. Server Configuration:**
```
Name: PORT
Value: 3000

Name: CORS_ORIGIN
Value: https://tshirtbackend.vercel.app

Name: RATE_LIMIT_WINDOW_MS
Value: 900000

Name: RATE_LIMIT_MAX_REQUESTS
Value: 100
```

## 🚀 **Cách import vào Vercel:**

### **Bước 1: Vào Environment Variables**
1. **Vercel Dashboard** → **Project** → **Settings** → **Environment Variables**

### **Bước 2: Add từng biến**
1. **Click "Add"**
2. **Paste Name và Value** từ danh sách trên
3. **Environment:** Chọn "Production" (hoặc "All")
4. **Click "Save"**

### **Bước 3: Redeploy**
1. **Vào Deployments**
2. **Click "Redeploy"** để áp dụng environment variables mới

## ⚡ **Quick Copy-Paste:**

**Copy từng dòng này vào Vercel:**

```
DB_ENVIRONMENT=atlas
REACT_APP_API_URL=https://tshirtbackend.vercel.app/api
NODE_ENV=production
JWT_SECRET=vietnam-tshirts-super-secret-jwt-key-2024-manhgg22
VNP_URL=https://sandbox.vnpayment.vn/paymentv2/vpcpay.html
VNP_API=https://sandbox.vnpayment.vn/merchant_webapi/api/transaction
VNP_RETURN_URL=https://tshirtbackend.vercel.app/api/orders/vnpay_return
PORT=3000
CORS_ORIGIN=https://tshirtbackend.vercel.app
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 🎯 **Sau khi import xong:**
- ✅ **Frontend:** `https://tshirtbackend.vercel.app`
- ✅ **Backend API:** `https://tshirtbackend.vercel.app/api/*`
- ✅ **Database:** MongoDB Atlas cloud
- ✅ **Authentication:** JWT với secret key
- ✅ **Payment:** VNPay integration (nếu cần)
