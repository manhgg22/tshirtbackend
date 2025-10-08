import express from 'express';
import * as orderController from '../controllers/orders.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

// Public routes (no auth required for demo)
router.post('/create', orderController.createOrder);
router.get('/all', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.patch('/:id/status', orderController.updateOrderStatus);
router.patch('/:id/mark-paid', orderController.markAsPaid);

// Protected routes
router.get('/my-orders', protect, orderController.getMyOrders);

export default router;