import { Router } from 'express';
import { getHomeShowcase, subscribeNewsletter } from '../controllers/storefrontController.ts';

const router = Router();

router.get('/home', getHomeShowcase);
router.post('/newsletter', subscribeNewsletter);

export default router;
