import Order from '../models/Order.js';
import QRCode from 'qrcode';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
});

// Send order confirmation email
const sendOrderConfirmationEmail = async (order, customerInfo) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: customerInfo.email,
      subject: `Xác nhận đơn hàng #${order.orderCode} - Vietnam T-Shirts`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #A61C1C;">🇻🇳 Xác nhận đơn hàng thành công!</h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>📋 Thông tin đơn hàng</h3>
            <p><strong>Mã đơn hàng:</strong> #${order.orderCode}</p>
            <p><strong>Ngày tạo:</strong> ${new Date(order.createdAt).toLocaleString('vi-VN')}</p>
            <p><strong>Tổng tiền:</strong> ${order.total.toLocaleString('vi-VN')}đ</p>
            <p><strong>Trạng thái:</strong> ⏳ Chờ thanh toán</p>
          </div>
          
          <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>🏠 Thông tin giao hàng</h3>
            <p><strong>Người nhận:</strong> ${customerInfo.name}</p>
            <p><strong>Địa chỉ:</strong> ${customerInfo.address}</p>
            <p><strong>Thành phố:</strong> ${customerInfo.city}</p>
            <p><strong>Quận/Huyện:</strong> ${customerInfo.district}</p>
            <p><strong>SĐT:</strong> ${customerInfo.phone}</p>
          </div>
          
          <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>💳 Hướng dẫn thanh toán</h3>
            <p><strong>Ngân hàng:</strong> TPBank</p>
            <p><strong>Số tài khoản:</strong> 0359937294</p>
            <p><strong>Chủ tài khoản:</strong> Nguyen Van A</p>
            <p><strong>Số tiền:</strong> ${order.total.toLocaleString('vi-VN')}đ</p>
            <p><strong>Nội dung:</strong> Thanh toan don hang ${order.orderCode}</p>
            <p style="color: #856404;"><strong>Lưu ý:</strong> Vui lòng quét mã QR trên website để thanh toán chính xác.</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <p>Cảm ơn bạn đã tin tưởng Vietnam T-Shirts!</p>
            <p style="color: #666;">Nếu có thắc mắc, vui lòng liên hệ: support@vietnamtshirts.com</p>
          </div>
        </div>
      `
    };
    
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${customerInfo.email} for order ${order.orderCode}`);
  } catch (error) {
    console.error('❌ Error sending email:', error);
  }
};

// Generate unique order code
const generateOrderCode = () => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `VN${timestamp}${random}`.toUpperCase();
};

// Create QR payment data for TPBank
const generateQRPaymentData = (orderCode, total) => {
  const bankAccount = '0359937294';
  const bankName = 'TPBank';
  const accountName = 'Nguyen Van A';
  
  // Create payment message
  const message = `Thanh toan don hang ${orderCode} - ${total.toLocaleString('vi-VN')} VND`;
  
  // TPBank QR format (simplified)
  const qrData = {
    bankAccount,
    bankName,
    accountName,
    amount: total,
    message,
    orderCode
  };
  
  return JSON.stringify(qrData);
};

export const createOrder = async (req, res) => {
  try {
    console.log('🔍 Backend createOrder called with:', req.body);
    
    const { items, total, shippingAddress, customerInfo, voucherCode, paymentMethod } = req.body;
    
    console.log('📦 Order data:', {
      items: items,
      total: total,
      shippingAddress: shippingAddress,
      customerInfo: customerInfo,
      voucherCode: voucherCode,
      paymentMethod: paymentMethod
    });
    
    // For demo purposes, create a mock user ID if not provided
    const userId = req.user?.userId || new mongoose.Types.ObjectId();
    console.log('👤 User ID:', userId);

    // Validate and apply voucher if provided
    let discountAmount = 0;
    let finalTotal = total;
    
    if (voucherCode) {
      const Voucher = (await import('../models/Voucher.js')).default;
      const voucher = await Voucher.findOne({
        code: voucherCode.toUpperCase(),
        isActive: true,
        validFrom: { $lte: new Date() },
        validUntil: { $gte: new Date() },
      });

      if (voucher) {
        if (total >= voucher.minOrderAmount) {
          if (voucher.type === 'percentage') {
            discountAmount = Math.round((total * voucher.value) / 100);
            if (voucher.maxDiscountAmount) {
              discountAmount = Math.min(discountAmount, voucher.maxDiscountAmount);
            }
          } else if (voucher.type === 'fixed') {
            discountAmount = voucher.value;
          }
          finalTotal = total - discountAmount;
          console.log('🎟️ Applied voucher:', voucherCode, 'Discount:', discountAmount);
        }
      }
    }

    const orderCode = generateOrderCode();
    console.log('🎫 Generated order code:', orderCode);
    
    const qrPaymentData = generateQRPaymentData(orderCode, finalTotal);
    console.log('📱 Generated QR data:', qrPaymentData);
    
    // Generate QR code image
    console.log('🔄 Generating QR code image...');
    const qrCodeImage = await QRCode.toDataURL(qrPaymentData, {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });
    console.log('✅ QR code image generated:', qrCodeImage.substring(0, 50) + '...');

    const order = new Order({
      userId,
      items,
      total: finalTotal,
      customerInfo: customerInfo || {
        name: 'Demo Customer',
        phone: '0123456789',
        email: 'demo@example.com',
        address: 'Demo Address',
        city: 'Ho Chi Minh',
        district: 'District 1',
        zipcode: '700000',
        note: 'Demo order'
      },
      shippingAddress: shippingAddress || {
        street: customerInfo?.address || 'Demo Address',
        city: customerInfo?.city || 'Ho Chi Minh',
        state: customerInfo?.district || 'District 1',
        zipCode: customerInfo?.zipcode || '700000',
        country: 'Vietnam'
      },
      orderCode,
      paymentMethod: paymentMethod || 'qr_tpbank',
      voucherCode: voucherCode || null,
      discountAmount: discountAmount,
      qrCode: {
        data: qrPaymentData,
        imageUrl: qrCodeImage,
        bankAccount: '0359937294',
        bankName: 'TPBank'
      }
    });

    console.log('💾 Saving order to database...');
    await order.save();
    console.log('✅ Order saved successfully:', order._id);
    
    // Send confirmation email if email is provided
    if (customerInfo?.email) {
      console.log('📧 Sending confirmation email...');
      await sendOrderConfirmationEmail(order, customerInfo);
    }
    
    console.log('🎉 Order created successfully, sending response...');
    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const orders = await Order.find({ userId })
      .populate('items.productId')
      .populate('items.designId')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('items.productId')
      .populate('items.designId')
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status' });
  }
};

export const markAsPaid = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { 
        paymentStatus: 'paid',
        status: 'paid',
        paidAt: new Date()
      },
      { new: true }
    );
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error updating payment status' });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.productId')
      .populate('items.designId')
      .populate('userId', 'name email');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order' });
  }
};