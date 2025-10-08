import Product from '../models/Product.js';
import Category from '../models/Category.js';
import Review from '../models/Review.js';

// GET /api/products
export const getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      subcategory,
      brand,
      minPrice,
      maxPrice,
      inStock,
      isFeatured,
      search,
      sort = 'newest',
      tags,
    } = req.query;

    let query = { isActive: true };

    // Category filter
    if (category) {
      query.category = category;
    }
    if (subcategory) {
      query.subcategory = subcategory;
    }

    // Brand filter
    if (brand) {
      query.brand = new RegExp(brand, 'i');
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseInt(minPrice);
      if (maxPrice) query.price.$lte = parseInt(maxPrice);
    }

    // Stock filter
    if (inStock !== undefined) {
      query.inStock = inStock === 'true';
    }

    // Featured filter
    if (isFeatured !== undefined) {
      query.isFeatured = isFeatured === 'true';
    }

    // Search filter
    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    // Tags filter
    if (tags) {
      const tagArray = tags.split(',');
      query.tags = { $in: tagArray };
    }

    // Sort options
    let sortOption = { createdAt: -1 };
    switch (sort) {
      case 'price_low':
        sortOption = { price: 1 };
        break;
      case 'price_high':
        sortOption = { price: -1 };
        break;
      case 'rating':
        sortOption = { 'rating.average': -1 };
        break;
      case 'sales':
        sortOption = { sales: -1 };
        break;
      case 'name':
        sortOption = { name: 1 };
        break;
      case 'oldest':
        sortOption = { createdAt: 1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    const products = await Product.find(query)
      .populate('category', 'name slug')
      .populate('subcategory', 'name slug')
      .sort(sortOption)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Product.countDocuments(query);

    // Get filter options
    const brands = await Product.distinct('brand', query);
    const priceRange = await Product.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
    ]);

    res.json({
      success: true,
      data: {
        products,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total,
        },
        filters: {
          brands: brands.filter(Boolean),
          priceRange: priceRange[0] || { minPrice: 0, maxPrice: 0 },
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách sản phẩm',
      error: error.message,
    });
  }
};

// GET /api/products/:id
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name slug')
      .populate('subcategory', 'name slug');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sản phẩm',
      });
    }

    // Increment view count
    product.views += 1;
    await product.save();

    // Get related products
    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
      isActive: true,
    })
      .populate('category', 'name slug')
      .limit(4);

    // Get reviews
    const reviews = await Review.find({
      productId: product._id,
      isApproved: true,
    })
      .populate('userId', 'name avatar')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      data: {
        product,
        relatedProducts,
        reviews,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy thông tin sản phẩm',
      error: error.message,
    });
  }
};

// POST /api/products
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      shortDescription,
      price,
      originalPrice,
      category,
      subcategory,
      brand,
      sku,
      variants,
      stock,
      weight,
      dimensions,
      tags,
      isFeatured,
      seo,
    } = req.body;

    // Validate category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({
        success: false,
        message: 'Danh mục không tồn tại',
      });
    }

    const product = new Product({
      name,
      description,
      shortDescription,
      price,
      originalPrice,
      images: req.files?.map(file => ({
        url: `/uploads/${file.filename}`,
        alt: name,
        isPrimary: false,
      })) || [],
      category,
      subcategory,
      brand,
      sku,
      variants: variants || [],
      stock: stock || 0,
      weight,
      dimensions,
      tags: tags || [],
      isFeatured: isFeatured || false,
      seo,
    });

    // Set first image as primary
    if (product.images.length > 0) {
      product.images[0].isPrimary = true;
    }

    await product.save();
    await product.populate('category', 'name slug');

    res.status(201).json({
      success: true,
      message: 'Tạo sản phẩm thành công',
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tạo sản phẩm',
      error: error.message,
    });
  }
};

// PUT /api/products/:id
export const updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      shortDescription,
      price,
      originalPrice,
      category,
      subcategory,
      brand,
      sku,
      variants,
      stock,
      weight,
      dimensions,
      tags,
      isFeatured,
      isActive,
      seo,
    } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        shortDescription,
        price,
        originalPrice,
        category,
        subcategory,
        brand,
        sku,
        variants,
        stock,
        weight,
        dimensions,
        tags,
        isFeatured,
        isActive,
        seo,
      },
      { new: true, runValidators: true }
    )
      .populate('category', 'name slug')
      .populate('subcategory', 'name slug');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sản phẩm',
      });
    }

    res.json({
      success: true,
      message: 'Cập nhật sản phẩm thành công',
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhật sản phẩm',
      error: error.message,
    });
  }
};

// DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sản phẩm',
      });
    }

    res.json({
      success: true,
      message: 'Xóa sản phẩm thành công',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa sản phẩm',
      error: error.message,
    });
  }
};