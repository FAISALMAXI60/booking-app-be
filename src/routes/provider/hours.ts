import { Router } from 'express';
import { requireAuth } from '../../middleware/auth.ts';
import { hoursSetupController } from '../../controllers/provider/hours_controller.ts';

const router = Router();

router.post("/create", requireAuth, hoursSetupController)

export default router;