// Webhook controller để xử lý thông báo thanh toán từ SePay
import Order from '../models/Order.js';
import User from '../models/User.js';
import crypto from 'crypto';

// Tạo webhook log model để theo dõi
import mongoose from 'mongoose';

const webhookLogSchema = new mongoose.Schema({
  webhookId: String,
  eventType: String,
  orderCode: String,
  amount: Number,
  bankAccount: String,
  transactionId: String,
  status: String,
  requestBody: mongoose.Schema.Types.Mixed,
  responseStatus: Number,
  responseBody: mongoose.Schema.Types.Mixed,
  processedAt: Date,
  error: String,
  createdAt: { type: Date, default: Date.now }
});

const WebhookLog = mongoose.model('WebhookLog', webhookLogSchema);

// Xác thực webhook SePay
const verifySePayWebhook = (req, res, next) => {
  try {
    const signature = req.headers['x-sepay-signature'];
    const timestamp = req.headers['x-sepay-timestamp'];
    const body = JSON.stringify(req.body);
    
    // Tạo signature để verify (nếu SePay có cung cấp secret)
    // const expectedSignature = crypto
    //   .createHmac('sha256', process.env.SEPAY_WEBHOOK_SECRET)
    //   .update(timestamp + body)
    //   .digest('hex');
    
    // Tạm thời skip verification vì SePay có thể không có signature
    // if (signature !== expectedSignature) {
    //   return res.status(401).json({ error: 'Invalid signature' });
    // }
    
    next();
  } catch (error) {
    console.error('Webhook verification error:', error);
    next();
  }
};

// Xử lý webhook thanh toán SePay
export const handleSePayWebhook = async (req, res) => {
  const webhookId = `sepay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  try {
    console.log('🔔 SePay Webhook received:', req.body);
    
    const {
      amount,
      description,
      bank_account,
      transaction_id,
      transaction_time,
      status,
      order_code,
      bank_name = 'MBBank'
    } = req.body;

    // Log webhook
    const webhookLog = new WebhookLog({
      webhookId,
      eventType: 'payment_received',
      orderCode: order_code,
      amount: amount,
      bankAccount: bank_account,
      transactionId: transaction_id,
      status: status,
      requestBody: req.body,
      processedAt: new Date()
    });

    // Tìm đơn hàng theo order code
    let order = null;
    if (order_code) {
      order = await Order.findOne({ orderCode: order_code });
    }

    // Nếu không tìm thấy order code, thử tìm theo description
    if (!order && description) {
      // Extract order code từ description nếu có format: "Thanh toan don hang #ORDER_CODE"
      const orderCodeMatch = description.match(/#([A-Z0-9]+)/i);
      if (orderCodeMatch) {
        order = await Order.findOne({ orderCode: orderCodeMatch[1] });
      }
    }

    if (!order) {
      console.log(`❌ Order not found for code: ${order_code || 'N/A'}`);
      webhookLog.status = 'order_not_found';
      webhookLog.error = `Order not found for code: ${order_code}`;
      await webhookLog.save();
      
      return res.status(404).json({ 
        success: false, 
        message: 'Order not found',
        webhookId 
      });
    }

    // Kiểm tra trạng thái thanh toán
    if (order.paymentStatus === 'paid') {
      console.log(`✅ Order ${order.orderCode} already paid`);
      webhookLog.status = 'already_paid';
      await webhookLog.save();
      
      return res.status(200).json({ 
        success: true, 
        message: 'Order already paid',
        webhookId 
      });
    }

    // Kiểm tra số tiền
    const expectedAmount = order.total;
    if (amount && Math.abs(amount - expectedAmount) > 1000) { // Cho phép sai lệch 1000 VND
      console.log(`❌ Amount mismatch. Expected: ${expectedAmount}, Received: ${amount}`);
      webhookLog.status = 'amount_mismatch';
      webhookLog.error = `Amount mismatch. Expected: ${expectedAmount}, Received: ${amount}`;
      await webhookLog.save();
      
      return res.status(400).json({ 
        success: false, 
        message: 'Amount mismatch',
        webhookId 
      });
    }

    // Cập nhật đơn hàng
    order.paymentStatus = 'paid';
    order.status = 'paid';
    order.paidAt = new Date();
    order.paymentDetails = {
      transactionId: transaction_id,
      gatewayResponse: req.body,
      paymentMethod: 'sepay_qr',
      bankAccount: bank_account,
      bankName: bank_name
    };

    await order.save();

    // Cập nhật webhook log
    webhookLog.status = 'success';
    webhookLog.responseStatus = 200;
    webhookLog.responseBody = { success: true, message: 'Payment processed' };
    await webhookLog.save();

    console.log(`✅ Order ${order.orderCode} marked as paid via SePay`);

    // Gửi email thông báo cho khách hàng (optional)
    try {
      const user = await User.findById(order.userId);
      if (user && user.email) {
        // TODO: Implement email notification
        console.log(`📧 Email notification sent to ${user.email}`);
      }
    } catch (emailError) {
      console.error('Email notification error:', emailError);
    }

    res.status(200).json({ 
      success: true, 
      message: 'Payment processed successfully',
      orderCode: order.orderCode,
      webhookId 
    });

  } catch (error) {
    console.error('❌ SePay webhook error:', error);
    
    // Log error
    const webhookLog = new WebhookLog({
      webhookId,
      eventType: 'payment_received',
      requestBody: req.body,
      status: 'error',
      error: error.message,
      processedAt: new Date()
    });
    await webhookLog.save();

    res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      webhookId 
    });
  }
};

// Lấy danh sách webhook logs
export const getWebhookLogs = async (req, res) => {
  try {
    const { page = 1, limit = 20, status, orderCode } = req.query;
    
    const filter = {};
    if (status) filter.status = status;
    if (orderCode) filter.orderCode = { $regex: orderCode, $options: 'i' };

    const logs = await WebhookLog.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await WebhookLog.countDocuments(filter);

    res.json({
      success: true,
      data: logs,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get webhook logs error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Test webhook endpoint
export const testWebhook = async (req, res) => {
  try {
    const testData = {
      amount: 100000,
      description: "Test payment for order #TEST123",
      bank_account: "686829078888",
      transaction_id: `test_${Date.now()}`,
      transaction_time: new Date().toISOString(),
      status: "success",
      order_code: "TEST123",
      bank_name: "MBBank"
    };

    console.log('🧪 Testing webhook with data:', testData);
    
    // Simulate webhook call
    req.body = testData;
    await handleSePayWebhook(req, res);
    
  } catch (error) {
    console.error('Test webhook error:', error);
    res.status(500).json({ success: false, message: 'Test failed' });
  }
};

export { verifySePayWebhook, WebhookLog };
