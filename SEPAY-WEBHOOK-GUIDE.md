# 🔔 Hướng dẫn tích hợp Webhook SePay cho inkverse.online

## 📋 Tổng quan
Website [inkverse.online](https://inkverse.online/) đã được tích hợp webhook SePay để tự động xác nhận thanh toán qua mã QR. Khi khách hàng thanh toán thành công, hệ thống sẽ tự động cập nhật trạng thái đơn hàng.

## 🚀 Cấu hình Webhook trên SePay

### 1. **Đăng nhập SePay Dashboard**
- Truy cập: https://inkverse.online/
- Đăng nhập với tài khoản SePay của bạn

### 2. **Tạo Webhook mới**
- Vào **Tích hợp & Thông báo** → **Tích hợp WebHooks**
- Click **"Thêm Webhook"**

### 3. **Cấu hình Webhook**

#### **Bước 1: Đặt tên**
```
Tên: Xác thực thanh toán inkverse.online
```

#### **Bước 2: Chọn sự kiện**
```
☑️ Bắn WebHooks khi: "Có tiền vào"
```

#### **Bước 3: Chọn điều kiện**
```
Tài khoản ngân hàng: MBBank - 686829078888 - LE DUC MANH
☑️ Bỏ qua nếu nội dung giao dịch không có Code thanh toán: Không
```

#### **Bước 4: Thuộc tính WebHooks**
```
Gọi đến URL: https://inkverse.online/api/webhooks/sepay-payment
☑️ Là WebHooks xác thực thanh toán: Có
Gọi lại Webhooks khi: HTTP Status Code không nằm trong phạm vi từ 200 đến 299
```

#### **Bước 5: Cấu hình chứng thực**
```
Kiểu chứng thực: Không cần chứng thực
Request Content type: application/json
Trạng thái: Kích hoạt
```

### 4. **Lưu và kích hoạt**
- Click **"Lưu"** để tạo webhook
- Đảm bảo trạng thái là **"Kích hoạt"**

## 🔧 Cấu hình Backend

### **Environment Variables**
Thêm vào file `.env` của server:
```env
# SePay Webhook Configuration
SEPAY_WEBHOOK_SECRET=your_sepay_secret_key
SEPAY_BANK_ACCOUNT=686829078888
SEPAY_BANK_NAME=MBBank
```

### **API Endpoints**
```
POST /api/webhooks/sepay-payment - Nhận webhook từ SePay
GET  /api/webhooks/logs - Xem logs webhook (Admin)
POST /api/webhooks/test - Test webhook
```

## 📊 Monitoring & Logs

### **Truy cập Webhook Logs**
- URL: `https://inkverse.online/admin/webhooks`
- Xem tất cả webhook logs với filter và search
- Chi tiết từng webhook call

### **Các trạng thái webhook:**
- ✅ **success**: Thanh toán thành công
- ❌ **error**: Lỗi xử lý
- ⚠️ **order_not_found**: Không tìm thấy đơn hàng
- ℹ️ **already_paid**: Đơn hàng đã thanh toán
- ⚠️ **amount_mismatch**: Sai số tiền

## 🧪 Test Webhook

### **Test từ Dashboard**
```bash
curl -X POST https://inkverse.online/api/webhooks/test \
  -H "Content-Type: application/json"
```

### **Test với dữ liệu thật**
```bash
curl -X POST https://inkverse.online/api/webhooks/sepay-payment \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 100000,
    "description": "Thanh toan don hang #ORDER123",
    "bank_account": "686829078888",
    "transaction_id": "test_123456",
    "transaction_time": "2024-01-01T10:00:00Z",
    "status": "success",
    "order_code": "ORDER123",
    "bank_name": "MBBank"
  }'
```

## 🔍 Troubleshooting

### **Webhook không hoạt động:**
1. Kiểm tra URL webhook có đúng không
2. Kiểm tra server có chạy không
3. Kiểm tra logs tại `/admin/webhooks`
4. Test webhook bằng endpoint `/api/webhooks/test`

### **Đơn hàng không được cập nhật:**
1. Kiểm tra `order_code` trong webhook có khớp với database không
2. Kiểm tra số tiền có khớp không
3. Kiểm tra trạng thái đơn hàng hiện tại

### **Lỗi 500 Internal Server Error:**
1. Kiểm tra logs server
2. Kiểm tra kết nối database
3. Kiểm tra cấu hình environment variables

## 📱 Cấu trúc dữ liệu Webhook

### **Request từ SePay:**
```json
{
  "amount": 100000,
  "description": "Thanh toan don hang #ORDER123",
  "bank_account": "686829078888",
  "transaction_id": "sepay_123456789",
  "transaction_time": "2024-01-01T10:00:00Z",
  "status": "success",
  "order_code": "ORDER123",
  "bank_name": "MBBank"
}
```

### **Response về SePay:**
```json
{
  "success": true,
  "message": "Payment processed successfully",
  "orderCode": "ORDER123",
  "webhookId": "sepay_1234567890_abc123"
}
```

## 🎯 Workflow thanh toán

1. **Khách hàng tạo đơn hàng** → Hệ thống tạo QR code
2. **Khách hàng quét QR và thanh toán** → SePay xử lý
3. **SePay gửi webhook** → `https://inkverse.online/api/webhooks/sepay-payment`
4. **Hệ thống xác thực** → Kiểm tra order_code, amount, status
5. **Cập nhật đơn hàng** → paymentStatus = 'paid', status = 'paid'
6. **Gửi email thông báo** → Khách hàng nhận email xác nhận
7. **Log webhook** → Lưu vào database để tracking

## 🔐 Bảo mật

- Webhook endpoint được bảo vệ bằng middleware xác thực
- Tất cả webhook calls được log để audit
- Rate limiting để tránh spam
- Validation dữ liệu đầu vào

## 📞 Hỗ trợ

Nếu gặp vấn đề, liên hệ:
- **Hotline SePay**: 02873.059.589
- **Admin Dashboard**: `https://inkverse.online/admin/webhooks`
- **API Status**: `https://inkverse.online/api/test`

---

✅ **Webhook đã sẵn sàng hoạt động!** 
Truy cập `https://inkverse.online/admin/webhooks` để monitor webhook logs.
