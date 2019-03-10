import { Router } from 'express';
import CatererController from '../controllers/caterer.controller';

const router = Router();

router.post('/register', CatererController.registerCaterer);
router.post('/login', CatererController.loginUser);


export default router;