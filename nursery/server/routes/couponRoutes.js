import express from 'express';
import {
  getCoupons,
  validateCoupon,
  createCoupon,
  deleteCoupon,
} from '../controllers/couponController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protectAdmin, getCoupons).post(protectAdmin, createCoupon);
router.route('/validate/:code').get(validateCoupon);
router.route('/:id').delete(protectAdmin, deleteCoupon);

export default router;
