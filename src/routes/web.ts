import { Router } from 'express';
import { webController } from '../controllers/web.controller';

const router: Router = Router();

router.post('/plus/:name', webController.count);
router.get('/get/:name', webController.get);
router.get('/all/counts', webController.all);
router.get('/all/counted', webController.allCounted);

export default router;
