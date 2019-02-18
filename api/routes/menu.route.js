import { Router } from 'express';

import menuController from '../controllers/menu.controller';

const router = Router();

router.get('/', menuController.fetchAllMenus);
router.post('/', menuController.addMenu);

export default router;