import express from 'express';
import { authAdmin, registerAdmin } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', authAdmin);
// Note: Keep /register available for initial setup
router.post('/register', registerAdmin);

export default router;
