import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    designId: { type: mongoose.Schema.Types.ObjectId, ref: 'Design' },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  }],
  total: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled'], 
    default: 'pending' 
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['qr_tpbank', 'cash', 'bank_transfer'],
    default: 'qr_tpbank'
  },
  qrCode: {
    data: { type: String },
    imageUrl: { type: String },
    bankAccount: { type: String, default: '0359937294' },
    bankName: { type: String, default: 'TPBank' }
  },
  customerInfo: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    address: { type: String, required: true },
    city: { type: String, required: true },
    district: { type: String, required: true },
    zipcode: { type: String },
    note: { type: String }
  },
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  orderCode: { type: String, required: true, unique: true },
  
  // Payment tracking
  paidAt: { type: Date },
  paymentMethod: {
    type: String,
    enum: ['qr_tpbank', 'vnpay', 'momo', 'zalopay', 'cod', 'bank_transfer'],
    default: 'qr_tpbank'
  },
  paymentDetails: {
    transactionId: String,
    gatewayResponse: mongoose.Schema.Types.Mixed,
  },
  
  // Order tracking
  confirmedAt: { type: Date },
  processingAt: { type: Date },
  shippedAt: { type: Date },
  deliveredAt: { type: Date },
  cancelledAt: { type: Date },
  cancelledBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  cancelReason: String,
  
  // Shipping
  shippingMethod: {
    type: String,
    enum: ['standard', 'express', 'overnight'],
    default: 'standard',
  },
  shippingFee: {
    type: Number,
    default: 0,
  },
  trackingNumber: String,
  carrier: String,
  
  // Discount
  voucherCode: String,
  discountAmount: {
    type: Number,
    default: 0,
  },
  
  // Notes
  notes: String,
  adminNotes: String,
  
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Order', orderSchema);