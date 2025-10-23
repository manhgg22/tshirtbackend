import express from 'express';
import {
  getVouchers,
  validateVoucher,
  createVoucher,
  updateVoucher,
  deleteVoucher,
} from '../controllers/vouchers.js';
import { protect, authorize } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.get('/', getVouchers);
router.post('/:code/validate', validateVoucher);

// Protected routes (Admin only)
router.post('/', protect, authorize('admin'), createVoucher);
router.put('/:id', protect, authorize('admin'), updateVoucher);
router.delete('/:id', protect, authorize('admin'), deleteVoucher);

export default router;
