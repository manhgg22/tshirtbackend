# 🚀 Hướng dẫn Deploy tự động cho inkverse.online

## 📋 Tổng quan
Script deploy tự động giúp bạn build frontend ở máy local (tiết kiệm RAM EC2) và push lên server một cách dễ dàng.

## 🛠️ Cài đặt ban đầu

### 1. **Setup EC2 Server (chỉ làm 1 lần)**

```bash
# Upload các file cần thiết lên EC2
scp setup-ec2.sh inkverse.service nginx-inkverse.conf ec2-user@YOUR_EC2_IP:~/

# SSH vào EC2 và chạy setup
ssh ec2-user@YOUR_EC2_IP
chmod +x setup-ec2.sh
./setup-ec2.sh
```

### 2. **Cấu hình deploy script**

Mở file `deploy.sh` và cập nhật thông tin:

```bash
# Thay đổi dòng này
EC2_HOST="your-ec2-ip"  # → EC2_HOST="1.2.3.4"
EC2_USER="ec2-user"    # → EC2_USER="ubuntu" (nếu dùng Ubuntu)
```

### 3. **Cấu hình SSH Key**

Đảm bảo bạn có thể SSH vào EC2 không cần password:

```bash
# Copy SSH key lên EC2
ssh-copy-id ec2-user@YOUR_EC2_IP

# Test SSH
ssh ec2-user@YOUR_EC2_IP "echo 'SSH working!'"
```

## 🚀 Sử dụng Deploy Script

### **Deploy hoàn chỉnh (khuyến nghị)**
```bash
./deploy.sh
```

### **Chỉ build frontend**
```bash
./deploy.sh build
```

### **Chỉ deploy (đã build rồi)**
```bash
./deploy.sh deploy
```

### **Test deployment**
```bash
./deploy.sh test
```

### **Cleanup files**
```bash
./deploy.sh clean
```

## 📁 Cấu trúc Files

```
EXE101/
├── deploy.sh              # Script deploy chính
├── setup-ec2.sh           # Setup EC2 server
├── inkverse.service       # Systemd service
├── nginx-inkverse.conf    # Nginx config
├── client/                # React frontend
├── server/                # Node.js backend
└── build/                 # Build output (tự tạo)
```

## 🔧 Workflow Deploy

1. **Build Frontend** → `npm run build` trong `client/`
2. **Prepare Server** → Copy server files + build vào `build/`
3. **Create Package** → Tạo `inkverse-deploy.tar.gz`
4. **Upload to EC2** → Upload package lên EC2
5. **Deploy on EC2** → Extract, install deps, restart services
6. **Test** → Kiểm tra API endpoints
7. **Cleanup** → Xóa files tạm

## 📊 Monitoring & Debugging

### **Kiểm tra service status**
```bash
ssh ec2-user@YOUR_EC2_IP "sudo systemctl status inkverse"
```

### **Xem logs**
```bash
ssh ec2-user@YOUR_EC2_IP "journalctl -u inkverse -f"
```

### **Restart service**
```bash
ssh ec2-user@YOUR_EC2_IP "sudo systemctl restart inkverse"
```

### **Check Nginx**
```bash
ssh ec2-user@YOUR_EC2_IP "sudo nginx -t"
```

### **Monitor system**
```bash
ssh ec2-user@YOUR_EC2_IP "./monitor.sh"
```

## 🌐 URLs sau khi deploy

- **Website**: `http://YOUR_EC2_IP` hoặc `https://inkverse.online`
- **API**: `http://YOUR_EC2_IP/api/test`
- **Admin**: `http://YOUR_EC2_IP/admin`
- **Webhooks**: `http://YOUR_EC2_IP/admin/webhooks`

## 🔐 SSL Setup (Let's Encrypt)

```bash
# SSH vào EC2
ssh ec2-user@YOUR_EC2_IP

# Setup SSL
sudo certbot --nginx -d inkverse.online -d www.inkverse.online

# Auto-renewal
sudo crontab -e
# Thêm dòng: 0 12 * * * /usr/bin/certbot renew --quiet
```

## 🚨 Troubleshooting

### **Deploy failed**
```bash
# Check logs
ssh ec2-user@YOUR_EC2_IP "journalctl -u inkverse -n 50"

# Check disk space
ssh ec2-user@YOUR_EC2_IP "df -h"

# Check memory
ssh ec2-user@YOUR_EC2_IP "free -h"
```

### **API không hoạt động**
```bash
# Check service
ssh ec2-user@YOUR_EC2_IP "sudo systemctl status inkverse"

# Check port
ssh ec2-user@YOUR_EC2_IP "sudo netstat -tlnp | grep :5000"

# Check Nginx
ssh ec2-user@YOUR_EC2_IP "sudo nginx -t"
```

### **Frontend không load**
```bash
# Check Nginx logs
ssh ec2-user@YOUR_EC2_IP "sudo tail -f /var/log/nginx/inkverse.error.log"

# Check file permissions
ssh ec2-user@YOUR_EC2_IP "ls -la /home/ec2-user/inkverse/"
```

## 📈 Performance Tips

### **Tối ưu Nginx**
- Enable gzip compression ✅ (đã có)
- Set cache headers ✅ (đã có)
- Use HTTP/2 ✅ (đã có)

### **Tối ưu Node.js**
- Use PM2 for process management
- Enable clustering
- Monitor memory usage

### **Tối ưu Database**
- Use connection pooling
- Enable query caching
- Monitor slow queries

## 🔄 CI/CD Integration

### **GitHub Actions**
```yaml
name: Deploy to EC2
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy
        run: ./deploy.sh
        env:
          EC2_HOST: ${{ secrets.EC2_HOST }}
```

### **GitLab CI**
```yaml
deploy:
  stage: deploy
  script:
    - ./deploy.sh
  only:
    - main
```

## 📞 Support

Nếu gặp vấn đề:
1. Check logs: `journalctl -u inkverse -f`
2. Check service status: `sudo systemctl status inkverse`
3. Check Nginx: `sudo nginx -t`
4. Monitor system: `./monitor.sh`

---

✅ **Deploy script đã sẵn sàng sử dụng!**