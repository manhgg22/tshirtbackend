import Review from '../models/Review.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

// GET /api/reviews
export const getReviews = async (req, res) => {
  try {
    const { productId, userId, rating, page = 1, limit = 10, sort = 'newest' } = req.query;
    
    let query = { isApproved: true };
    
    if (productId) query.productId = productId;
    if (userId) query.userId = userId;
    if (rating) query.rating = parseInt(rating);

    let sortOption = { createdAt: -1 };
    if (sort === 'oldest') sortOption = { createdAt: 1 };
    if (sort === 'rating_high') sortOption = { rating: -1 };
    if (sort === 'rating_low') sortOption = { rating: 1 };
    if (sort === 'helpful') sortOption = { helpful: -1 };

    const reviews = await Review.find(query)
      .populate('userId', 'name avatar')
      .populate('productId', 'name images')
      .sort(sortOption)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Review.countDocuments(query);

    res.json({
      success: true,
      data: {
        reviews,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách đánh giá',
      error: error.message,
    });
  }
};

// POST /api/reviews
export const createReview = async (req, res) => {
  try {
    const { productId, orderId, rating, title, comment, images } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Vui lòng đăng nhập để đánh giá',
      });
    }

    // Check if user already reviewed this product
    const existingReview = await Review.findOne({ userId, productId });
    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'Bạn đã đánh giá sản phẩm này rồi',
      });
    }

    // Verify order ownership if orderId provided
    if (orderId) {
      const order = await Order.findOne({ 
        _id: orderId, 
        userId,
        status: 'delivered',
        'items.productId': productId 
      });
      
      if (!order) {
        return res.status(400).json({
          success: false,
          message: 'Bạn chỉ có thể đánh giá sản phẩm đã mua và nhận hàng',
        });
      }
    }

    const review = new Review({
      userId,
      productId,
      orderId,
      rating,
      title,
      comment,
      images: images || [],
      isVerified: !!orderId,
    });

    await review.save();
    await review.populate('userId', 'name avatar');

    res.status(201).json({
      success: true,
      message: 'Đánh giá thành công',
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tạo đánh giá',
      error: error.message,
    });
  }
};

// PUT /api/reviews/:id
export const updateReview = async (req, res) => {
  try {
    const { rating, title, comment, images } = req.body;
    const userId = req.user?.userId;

    const review = await Review.findOne({ _id: req.params.id, userId });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy đánh giá hoặc bạn không có quyền chỉnh sửa',
      });
    }

    review.rating = rating || review.rating;
    review.title = title || review.title;
    review.comment = comment || review.comment;
    review.images = images || review.images;

    await review.save();

    res.json({
      success: true,
      message: 'Cập nhật đánh giá thành công',
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhật đánh giá',
      error: error.message,
    });
  }
};

// DELETE /api/reviews/:id
export const deleteReview = async (req, res) => {
  try {
    const userId = req.user?.userId;

    const review = await Review.findOne({ _id: req.params.id, userId });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy đánh giá hoặc bạn không có quyền xóa',
      });
    }

    await Review.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Xóa đánh giá thành công',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa đánh giá',
      error: error.message,
    });
  }
};

// POST /api/reviews/:id/helpful
export const markHelpful = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy đánh giá',
      });
    }

    review.helpful += 1;
    await review.save();

    res.json({
      success: true,
      message: 'Cảm ơn bạn đã đánh giá hữu ích',
      data: { helpful: review.helpful },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi đánh dấu hữu ích',
      error: error.message,
    });
  }
};

// POST /api/reviews/:id/report
export const reportReview = async (req, res) => {
  try {
    const { reason } = req.body;
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy đánh giá',
      });
    }

    review.reported += 1;
    await review.save();

    // TODO: Send notification to admin about reported review

    res.json({
      success: true,
      message: 'Báo cáo đánh giá thành công',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi báo cáo đánh giá',
      error: error.message,
    });
  }
};
