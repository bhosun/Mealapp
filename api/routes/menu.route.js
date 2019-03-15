import { Router } from 'express';
import menuController from '../controllers/menu.controller';
import AuthController from '../controllers/auth';

const router = Router();

router.get('/', AuthController.verifyUser, menuController.fetchAllMenus);
router.post('/', AuthController.verifyOga, menuController.addMenu);

export default router;