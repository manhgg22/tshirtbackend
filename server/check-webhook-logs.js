// Script để kiểm tra webhook logs và debug
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://manhgg22_db_user:zsygae8XCNw0JKa9@cluster0.d4zw1qf.mongodb.net/vietnam-tshirts?retryWrites=true&w=majority&appName=Cluster0';

async function checkWebhookLogs() {
  try {
    console.log('🔗 Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');

    // Tạo WebhookLog model
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

    // Lấy webhook logs gần đây
    const recentLogs = await WebhookLog.find()
      .sort({ createdAt: -1 })
      .limit(10);

    console.log('📊 Recent Webhook Logs:');
    recentLogs.forEach((log, index) => {
      console.log(`\n${index + 1}. Webhook ID: ${log.webhookId}`);
      console.log(`   Status: ${log.status}`);
      console.log(`   Order Code: ${log.orderCode}`);
      console.log(`   Amount: ${log.amount}`);
      console.log(`   Error: ${log.error || 'None'}`);
      console.log(`   Request Body:`, JSON.stringify(log.requestBody, null, 2));
    });

    // Kiểm tra các đơn hàng có order code tương tự
    const Order = mongoose.model('Order', new mongoose.Schema({}, { strict: false }));
    
    console.log('\n🔍 Checking orders in database:');
    const allOrders = await Order.find().select('orderCode paymentStatus createdAt').sort({ createdAt: -1 }).limit(10);
    
    allOrders.forEach((order, index) => {
      console.log(`${index + 1}. ${order.orderCode} - ${order.paymentStatus} - ${order.createdAt}`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

checkWebhookLogs();
