import express from 'express';
import {
  addOrderItems,
  getOrders,
  updateOrderStatus,
  updateOrderToPaid,
} from '../controllers/orderController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(addOrderItems).get(protectAdmin, getOrders);
router.route('/:id/status').put(protectAdmin, updateOrderStatus);
router.route('/:id/pay').put(updateOrderToPaid);

export default router;
