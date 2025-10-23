import express from 'express';
import {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
  markHelpful,
  reportReview,
} from '../controllers/reviews.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.get('/', getReviews);

// Protected routes
router.post('/', protect, createReview);
router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);
router.post('/:id/helpful', markHelpful);
router.post('/:id/report', reportReview);

export default router;
