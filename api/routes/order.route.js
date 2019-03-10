import { Router } from 'express';
import orderController from '../controllers/order.controller';
import AuthController from '../controllers/auth';


const router = Router();

router.get('/', AuthController.verifyOga, orderController.fetchAllOrders);
router.post('/', AuthController.verifyUser, orderController.addOrder);
router.put('/:id', AuthController.verifyUser, orderController.editOrder);

export default router;
