import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  phone: {
    type: String,
  },
  code: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['email_verification', 'phone_verification', 'password_reset', 'login'],
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
  },
  isUsed: {
    type: Boolean,
    default: false,
  },
  attempts: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

// Index for cleanup
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model('OTP', otpSchema);
