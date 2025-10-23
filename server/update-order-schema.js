// Script để update Order schema trong MongoDB Atlas
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// MongoDB Atlas connection
const MONGODB_URI = 'mongodb+srv://manhgg22_db_user:zsygae8XCNw0JKa9@cluster0.d4zw1qf.mongodb.net/vietnam-tshirts?retryWrites=true&w=majority&appName=Cluster0';

async function updateOrderSchema() {
  try {
    console.log('🔗 Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');

    const db = mongoose.connection.db;
    const ordersCollection = db.collection('orders');

    // Update existing orders to use qr_mbbank instead of qr_tpbank
    console.log('🔄 Updating existing orders...');
    const updateResult = await ordersCollection.updateMany(
      { paymentMethod: 'qr_tpbank' },
      { 
        $set: { 
          paymentMethod: 'qr_mbbank',
          'qrCode.bankAccount': '686829078888',
          'qrCode.bankName': 'MBBank',
          'qrCode.bankId': '970422',
          'qrCode.accountName': 'LE DUC MANH'
        } 
      }
    );

    console.log(`✅ Updated ${updateResult.modifiedCount} orders`);

    // Show current payment methods in database
    const paymentMethods = await ordersCollection.distinct('paymentMethod');
    console.log('📊 Current payment methods in database:', paymentMethods);

    console.log('🎉 Database update completed successfully!');
    
  } catch (error) {
    console.error('❌ Error updating database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

updateOrderSchema();
