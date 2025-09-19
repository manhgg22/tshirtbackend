import express from 'express';
import * as orderController from '../controllers/orders';
import { protect } from '../middlewares/auth'; // ✅


const router = express.Router();

router.post('/', protect, orderController.createOrder);
router.get('/my-orders', protect, orderController.getMyOrders);
router.patch('/:id/status', protect, orderController.updateOrderStatus);

export default router;
