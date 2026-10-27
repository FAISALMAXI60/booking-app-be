import { Router } from 'express';
import { businessSetupController } from '../../controllers/provider/business_controller.ts';
import { requireAuth } from '../../middleware/auth.ts';

const router = Router();

router.post("/create", requireAuth, businessSetupController)

export default router;