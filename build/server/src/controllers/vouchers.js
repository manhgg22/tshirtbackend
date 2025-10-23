import Voucher from '../models/Voucher.js';
import Order from '../models/Order.js';

// GET /api/vouchers
export const getVouchers = async (req, res) => {
  try {
    const { isActive = true, isPublic = true } = req.query;
    
    const query = {
      isActive: isActive === 'true',
      isPublic: isPublic === 'true',
      validFrom: { $lte: new Date() },
      validUntil: { $gte: new Date() },
    };

    const vouchers = await Voucher.find(query)
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: vouchers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách voucher',
      error: error.message,
    });
  }
};

// GET /api/vouchers/:code/validate
export const validateVoucher = async (req, res) => {
  try {
    const { code } = req.params;
    const { orderAmount, userId } = req.body;

    const voucher = await Voucher.findOne({
      code: code.toUpperCase(),
      isActive: true,
      validFrom: { $lte: new Date() },
      validUntil: { $gte: new Date() },
    });

    if (!voucher) {
      return res.status(404).json({
        success: false,
        message: 'Mã giảm giá không tồn tại hoặc đã hết hạn',
      });
    }

    // Check usage limit
    if (voucher.usageLimit && voucher.usedCount >= voucher.usageLimit) {
      return res.status(400).json({
        success: false,
        message: 'Mã giảm giá đã hết lượt sử dụng',
      });
    }

    // Check minimum order amount
    if (orderAmount < voucher.minOrderAmount) {
      return res.status(400).json({
        success: false,
        message: `Đơn hàng tối thiểu ${voucher.minOrderAmount.toLocaleString('vi-VN')}đ để sử dụng mã này`,
      });
    }

    // Check user usage limit
    if (userId && voucher.userLimit > 1) {
      const userUsageCount = await Order.countDocuments({
        userId,
        voucherCode: code.toUpperCase(),
        status: { $in: ['paid', 'processing', 'shipped', 'delivered'] },
      });

      if (userUsageCount >= voucher.userLimit) {
        return res.status(400).json({
          success: false,
          message: `Bạn đã sử dụng mã này ${userUsageCount}/${voucher.userLimit} lần`,
        });
      }
    }

    // Calculate discount
    let discountAmount = 0;
    if (voucher.type === 'percentage') {
      discountAmount = Math.round((orderAmount * voucher.value) / 100);
      if (voucher.maxDiscountAmount) {
        discountAmount = Math.min(discountAmount, voucher.maxDiscountAmount);
      }
    } else if (voucher.type === 'fixed') {
      discountAmount = voucher.value;
    } else if (voucher.type === 'free_shipping') {
      discountAmount = 0; // Will be handled separately
    }

    res.json({
      success: true,
      data: {
        voucher: {
          code: voucher.code,
          name: voucher.name,
          type: voucher.type,
          value: voucher.value,
          discountAmount,
          isFreeShipping: voucher.type === 'free_shipping',
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xác thực mã giảm giá',
      error: error.message,
    });
  }
};

// POST /api/vouchers
export const createVoucher = async (req, res) => {
  try {
    const {
      code,
      name,
      description,
      type,
      value,
      minOrderAmount,
      maxDiscountAmount,
      usageLimit,
      userLimit,
      applicableProducts,
      applicableCategories,
      excludedProducts,
      validFrom,
      validUntil,
      isPublic,
    } = req.body;

    const createdBy = req.user?.userId;

    if (!createdBy) {
      return res.status(401).json({
        success: false,
        message: 'Vui lòng đăng nhập để tạo voucher',
      });
    }

    const voucher = new Voucher({
      code: code.toUpperCase(),
      name,
      description,
      type,
      value,
      minOrderAmount: minOrderAmount || 0,
      maxDiscountAmount,
      usageLimit,
      userLimit: userLimit || 1,
      applicableProducts,
      applicableCategories,
      excludedProducts,
      validFrom: new Date(validFrom),
      validUntil: new Date(validUntil),
      isPublic: isPublic !== false,
      createdBy,
    });

    await voucher.save();

    res.status(201).json({
      success: true,
      message: 'Tạo voucher thành công',
      data: voucher,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tạo voucher',
      error: error.message,
    });
  }
};

// PUT /api/vouchers/:id
export const updateVoucher = async (req, res) => {
  try {
    const {
      name,
      description,
      type,
      value,
      minOrderAmount,
      maxDiscountAmount,
      usageLimit,
      userLimit,
      applicableProducts,
      applicableCategories,
      excludedProducts,
      validFrom,
      validUntil,
      isActive,
      isPublic,
    } = req.body;

    const voucher = await Voucher.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        type,
        value,
        minOrderAmount,
        maxDiscountAmount,
        usageLimit,
        userLimit,
        applicableProducts,
        applicableCategories,
        excludedProducts,
        validFrom: validFrom ? new Date(validFrom) : undefined,
        validUntil: validUntil ? new Date(validUntil) : undefined,
        isActive,
        isPublic,
      },
      { new: true, runValidators: true }
    );

    if (!voucher) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy voucher',
      });
    }

    res.json({
      success: true,
      message: 'Cập nhật voucher thành công',
      data: voucher,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhật voucher',
      error: error.message,
    });
  }
};

// DELETE /api/vouchers/:id
export const deleteVoucher = async (req, res) => {
  try {
    const voucher = await Voucher.findByIdAndDelete(req.params.id);

    if (!voucher) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy voucher',
      });
    }

    res.json({
      success: true,
      message: 'Xóa voucher thành công',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa voucher',
      error: error.message,
    });
  }
};
