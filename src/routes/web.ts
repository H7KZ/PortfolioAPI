import { Router } from 'express';
import { webController } from '../controllers/web.controller';

const router: Router = Router();

router.post('/plus/:name', webController.count);
router.post('/create/:name', webController.create);
router.get('/get/:name', webController.get);
router.get('/get/counts', webController.all);
router.get('/get/counted', webController.allCounted);

export default router;
