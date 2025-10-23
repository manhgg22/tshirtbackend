// Payment routes cho hệ thống thanh toán QR
import express from 'express';
import * as paymentController from '../controllers/paymentController.js';

const router = express.Router();

// Kiểm tra trạng thái thanh toán
router.get('/status/:orderCode', paymentController.checkPaymentStatus);

// Lấy thông tin đơn hàng để thanh toán
router.get('/info/:orderCode', paymentController.getPaymentInfo);

// Tạo đơn hàng mới
router.post('/create', paymentController.createPaymentOrder);

// Hủy đơn hàng hết hạn
router.post('/cancel/:orderCode', paymentController.cancelExpiredOrder);

export default router;
