// Script để kiểm tra đơn hàng trong database
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://manhgg22_db_user:zsygae8XCNw0JKa9@cluster0.d4zw1qf.mongodb.net/vietnam-tshirts?retryWrites=true&w=majority&appName=Cluster0';

async function checkOrders() {
  try {
    console.log('🔗 Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');

    const Order = mongoose.model('Order', new mongoose.Schema({}, { strict: false }));

    // Tìm đơn hàng cụ thể
    const order = await Order.findOne({ orderCode: 'VNMH2RP44ZJYVR1' });
    
    if (order) {
      console.log('📦 Order found:');
      console.log('   Order Code:', order.orderCode);
      console.log('   Payment Status:', order.paymentStatus);
      console.log('   Status:', order.status);
      console.log('   Paid At:', order.paidAt);
      console.log('   Total:', order.total);
      console.log('   Customer:', order.customerInfo?.name);
      console.log('   Transaction ID:', order.paymentDetails?.transactionId);
    } else {
      console.log('❌ Order not found');
    }

    // Đếm tổng số đơn hàng
    const totalOrders = await Order.countDocuments();
    const paidOrders = await Order.countDocuments({ paymentStatus: 'paid' });
    
    console.log('\n📊 Database Statistics:');
    console.log('   Total Orders:', totalOrders);
    console.log('   Paid Orders:', paidOrders);
    console.log('   Pending Orders:', totalOrders - paidOrders);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

checkOrders();
