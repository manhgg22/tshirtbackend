import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Vui lòng nhập tên'],
  },
  email: {
    type: String,
    required: [true, 'Vui lòng nhập email'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    minlength: 6,
  },
  phone: {
    type: String,
    unique: true,
    sparse: true,
  },
  avatar: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'staff', 'seller'],
    default: 'user',
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  isPhoneVerified: {
    type: Boolean,
    default: false,
  },
  // OAuth fields
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  facebookId: {
    type: String,
    unique: true,
    sparse: true,
  },
  // Address management
  addresses: [{
    type: {
      type: String,
      enum: ['home', 'work', 'other'],
      default: 'home',
    },
    name: String,
    phone: String,
    address: String,
    city: String,
    district: String,
    ward: String,
    zipcode: String,
    isDefault: {
      type: Boolean,
      default: false,
    },
  }],
  // Preferences
  preferences: {
    newsletter: {
      type: Boolean,
      default: true,
    },
    notifications: {
      email: {
        type: Boolean,
        default: true,
      },
      sms: {
        type: Boolean,
        default: false,
      },
      push: {
        type: Boolean,
        default: true,
      },
    },
  },
  // Security
  lastLogin: Date,
  loginAttempts: {
    type: Number,
    default: 0,
  },
  lockUntil: Date,
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);