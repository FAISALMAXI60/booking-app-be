import { Router } from 'express';
import { servicesSetupController } from '../../controllers/provider/services_controller.ts';
import { requireAuth } from '../../middleware/auth.ts';

const router = Router();

router.post("/create", requireAuth, servicesSetupController)

export default router;