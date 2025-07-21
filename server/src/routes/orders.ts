import express from 'express';
import * as orderController from '../controllers/orders';
import { auth } from '../middlewares/auth';

const router = express.Router();

router.post('/', auth, orderController.createOrder);
router.get('/my-orders', auth, orderController.getMyOrders);
router.patch('/:id/status', auth, orderController.updateOrderStatus);

export default router;
