import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: { 
    type: String, 
    required: true,
  },
  shortDescription: String,
  price: { 
    type: Number, 
    required: true,
    min: 0,
  },
  originalPrice: {
    type: Number,
    min: 0,
  },
  images: [{
    url: String,
    alt: String,
    isPrimary: {
      type: Boolean,
      default: false,
    },
  }],
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category',
    required: true,
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  brand: String,
  sku: {
    type: String,
    unique: true,
    sparse: true,
  },
  variants: [{
    name: String, // Size, Color, etc.
    options: [String], // S, M, L, XL or Red, Blue, Green
    price: Number,
    stock: Number,
  }],
  stock: {
    type: Number,
    default: 0,
    min: 0,
  },
  inStock: { 
    type: Boolean, 
    default: true,
  },
  weight: Number, // grams
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
  },
  tags: [String],
  isActive: {
    type: Boolean,
    default: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  seo: {
    title: String,
    description: String,
    keywords: [String],
  },
  // Analytics
  views: {
    type: Number,
    default: 0,
  },
  sales: {
    type: Number,
    default: 0,
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
}, { timestamps: true });

// Auto-generate slug
productSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

export default mongoose.model('Product', productSchema);