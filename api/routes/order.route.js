import { Router } from 'express';
import orderController from '../controllers/order.controller';


const router = Router();

router.get('/', orderController.fetchAllOrders);
router.post('/', orderController.addOrder);
router.put('/:id', orderController.editOrder);

export default router;
