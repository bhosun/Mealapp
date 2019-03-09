import { Router } from 'express';
import catererController from '../controllers/caterer.controller';

const router = Router();

router.post('/register', catererController.registerCaterer);
router.post('/login', catererController.loginUser);


export default router;