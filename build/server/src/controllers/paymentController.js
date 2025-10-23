// Payment status controller để kiểm tra trạng thái thanh toán real-time
import Order from '../models/Order.js';
import mongoose from 'mongoose';

// Kiểm tra trạng thái thanh toán của đơn hàng
export const checkPaymentStatus = async (req, res) => {
  try {
    const { orderCode } = req.params;
    
    if (!orderCode) {
      return res.status(400).json({ 
        success: false, 
        message: 'Order code is required' 
      });
    }

    const order = await Order.findOne({ orderCode });
    
    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: 'Order not found' 
      });
    }

    // Tính thời gian còn lại (15 phút từ khi tạo đơn)
    const orderAge = Date.now() - new Date(order.createdAt).getTime();
    const timeRemaining = Math.max(0, 15 * 60 * 1000 - orderAge); // 15 phút
    const isExpired = timeRemaining === 0;

    const response = {
      success: true,
      orderCode: order.orderCode,
      paymentStatus: order.paymentStatus,
      orderStatus: order.status,
      total: order.total,
      createdAt: order.createdAt,
      paidAt: order.paidAt,
      timeRemaining: timeRemaining,
      isExpired: isExpired,
      qrCode: {
        imageUrl: order.qrCode?.imageUrl,
        bankAccount: order.qrCode?.bankAccount,
        bankName: order.qrCode?.bankName
      }
    };

    // Nếu đã thanh toán, thêm thông tin chi tiết
    if (order.paymentStatus === 'paid') {
      response.paymentDetails = order.paymentDetails;
      response.message = 'Thanh toán thành công!';
    } else if (isExpired) {
      response.message = 'Đơn hàng đã hết hạn thanh toán';
    } else {
      response.message = 'Đang chờ thanh toán...';
    }

    res.json(response);

  } catch (error) {
    console.error('Check payment status error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};

// Lấy thông tin đơn hàng để hiển thị trang thanh toán
export const getPaymentInfo = async (req, res) => {
  try {
    const { orderCode } = req.params;
    
    const order = await Order.findOne({ orderCode })
      .populate('items.productId')
      .populate('items.designId');

    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: 'Order not found' 
      });
    }

    // Tính thời gian còn lại
    const orderAge = Date.now() - new Date(order.createdAt).getTime();
    const timeRemaining = Math.max(0, 15 * 60 * 1000 - orderAge);
    const isExpired = timeRemaining === 0;

    const response = {
      success: true,
      order: {
        _id: order._id,
        orderCode: order.orderCode,
        total: order.total,
        paymentStatus: order.paymentStatus,
        status: order.status,
        createdAt: order.createdAt,
        paidAt: order.paidAt,
        customerInfo: order.customerInfo,
        items: order.items,
        qrCode: order.qrCode,
        paymentMethod: order.paymentMethod
      },
      timeRemaining: timeRemaining,
      isExpired: isExpired,
      paymentInstructions: {
        bankAccount: order.qrCode?.bankAccount || '0359937294',
        bankName: order.qrCode?.bankName || 'TPBank',
        accountName: 'Nguyen Van A',
        amount: order.total,
        content: `Thanh toan don hang ${order.orderCode}`
      }
    };

    res.json(response);

  } catch (error) {
    console.error('Get payment info error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};

// Tạo đơn hàng mới với QR code
export const createPaymentOrder = async (req, res) => {
  try {
    const { items, total, customerInfo, shippingAddress, paymentMethod = 'qr_tpbank' } = req.body;
    
    if (!items || !total || !customerInfo) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }

    // Generate order code
    const generateOrderCode = () => {
      const timestamp = Date.now().toString(36);
      const random = Math.random().toString(36).substr(2, 5);
      return `VN${timestamp}${random}`.toUpperCase();
    };

    const orderCode = generateOrderCode();
    
    // Create order
    const order = new Order({
      userId: new mongoose.Types.ObjectId(), // Demo user
      items,
      total,
      customerInfo,
      shippingAddress: shippingAddress || {
        street: customerInfo.address,
        city: customerInfo.city,
        state: customerInfo.district,
        zipCode: customerInfo.zipcode || '000000',
        country: 'Vietnam'
      },
      orderCode,
      paymentMethod,
      qrCode: {
        bankAccount: '0359937294',
        bankName: 'TPBank'
      }
    });

    await order.save();

    res.status(201).json({
      success: true,
      orderCode: order.orderCode,
      message: 'Order created successfully',
      paymentUrl: `/payment/${order.orderCode}`
    });

  } catch (error) {
    console.error('Create payment order error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};

// Hủy đơn hàng khi hết hạn
export const cancelExpiredOrder = async (req, res) => {
  try {
    const { orderCode } = req.params;
    
    const order = await Order.findOne({ orderCode });
    
    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: 'Order not found' 
      });
    }

    if (order.paymentStatus === 'paid') {
      return res.status(400).json({ 
        success: false, 
        message: 'Order already paid' 
      });
    }

    // Kiểm tra xem đơn hàng có hết hạn không (15 phút)
    const orderAge = Date.now() - new Date(order.createdAt).getTime();
    const isExpired = orderAge > 15 * 60 * 1000;

    if (!isExpired) {
      return res.status(400).json({ 
        success: false, 
        message: 'Order not expired yet' 
      });
    }

    // Cập nhật trạng thái đơn hàng
    order.status = 'cancelled';
    order.paymentStatus = 'failed';
    order.cancelledAt = new Date();
    order.cancelReason = 'Payment timeout';

    await order.save();

    res.json({
      success: true,
      message: 'Order cancelled due to payment timeout',
      orderCode: order.orderCode
    });

  } catch (error) {
    console.error('Cancel expired order error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};
