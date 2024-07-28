import express from 'express';
import * as authController from '../controllers/authController';
import { validateRegister, validateLogin } from '../middleware/validation';

const router = express.Router();

router.post("/register", validateRegister, authController.register);
router.post("/login", validateLogin, authController.login);
router.post("/signout",authController.signout )
export default router;