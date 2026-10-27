import { Router } from 'express';
import { loginController, signUpController } from '../controllers/auth_controller.ts';

const router = Router();

router.post('/sign_up', signUpController);
router.post('/login', loginController);

export default router;