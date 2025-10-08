import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: [
      'order_created',
      'order_confirmed',
      'order_shipped',
      'order_delivered',
      'order_cancelled',
      'payment_success',
      'payment_failed',
      'review_request',
      'voucher_received',
      'promotion',
      'system',
    ],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  data: {
    orderId: mongoose.Schema.Types.ObjectId,
    productId: mongoose.Schema.Types.ObjectId,
    voucherId: mongoose.Schema.Types.ObjectId,
    url: String,
    image: String,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  readAt: Date,
  channels: [{
    type: String,
    enum: ['email', 'sms', 'push', 'in_app'],
    default: ['in_app'],
  }],
  sentAt: {
    email: Date,
    sms: Date,
    push: Date,
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium',
  },
}, { timestamps: true });

// Indexes
notificationSchema.index({ userId: 1, createdAt: -1 });
notificationSchema.index({ userId: 1, isRead: 1 });
notificationSchema.index({ type: 1 });

export default mongoose.model('Notification', notificationSchema);
