import { Router } from 'express';
import { getHealthStatus } from '../controllers/healthController.ts';

const router = Router();

router.get('/', getHealthStatus);

export default router;
