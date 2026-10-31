import { Router } from 'express';
import { loginController, signUpController, getCurrentUserController } from '../controllers/auth_controller.ts';
import { requireAuth } from '../middleware/auth.ts';

const router = Router();

router.post('/sign_up', signUpController);
router.post('/login', loginController);
router.get("/me", requireAuth, getCurrentUserController)

export default router;