// Script để manual update đơn hàng đã thanh toán
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// MongoDB Atlas connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://manhgg22_db_user:zsygae8XCNw0JKa9@cluster0.d4zw1qf.mongodb.net/vietnam-tshirts?retryWrites=true&w=majority&appName=Cluster0';

async function updatePaidOrders() {
  try {
    console.log('🔗 Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');

    const Order = mongoose.model('Order', new mongoose.Schema({
      orderCode: String,
      paymentStatus: String,
      status: String,
      paidAt: Date,
      paymentDetails: mongoose.Schema.Types.Mixed
    }));

    // Danh sách các đơn hàng đã thanh toán
    const paidOrders = [
      {
        orderCode: 'VNMH2RP44ZJYVR1',
        amount: 329000,
        transactionId: 'FT25296734414350',
        paidAt: new Date('2025-10-23T08:54:00Z')
      },
      {
        orderCode: 'VNMH2SAA31BK9P1', 
        amount: 329000,
        transactionId: 'FT25296006762851',
        paidAt: new Date('2025-10-23T09:09:00Z')
      }
    ];

    for (const orderData of paidOrders) {
      console.log(`🔄 Updating order ${orderData.orderCode}...`);
      
      const updateResult = await Order.updateOne(
        { orderCode: orderData.orderCode },
        {
          $set: {
            paymentStatus: 'paid',
            status: 'paid',
            paidAt: orderData.paidAt,
            paymentDetails: {
              transactionId: orderData.transactionId,
              gatewayResponse: {
                gateway: 'MBBank',
                amount: orderData.amount,
                accountNumber: '686829078888',
                transferType: 'in'
              },
              paymentMethod: 'sepay_qr',
              bankAccount: '686829078888',
              bankName: 'MBBank'
            }
          }
        }
      );

      if (updateResult.matchedCount > 0) {
        console.log(`✅ Updated order ${orderData.orderCode}`);
      } else {
        console.log(`❌ Order ${orderData.orderCode} not found`);
      }
    }

    // Show all paid orders
    const paidOrdersList = await Order.find({ paymentStatus: 'paid' }).select('orderCode paymentStatus paidAt');
    console.log('📊 All paid orders:', paidOrdersList);

    console.log('🎉 Manual update completed!');
    
  } catch (error) {
    console.error('❌ Error updating orders:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

updatePaidOrders();
