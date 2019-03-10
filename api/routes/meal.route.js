import { Router } from 'express';
import mealController from '../controllers/meal.controller';
import AuthController from '../controllers/auth';

const router = Router();

router.get('/', AuthController.verifyOga, mealController.fetchAllMeals);
router.post('/', AuthController.verifyOga, mealController.addAMeal);
router.get('/:id', AuthController.verifyOga, mealController.getSingleMeal);
router.put('/:id', AuthController.verifyOga, mealController.updateMeal);
router.delete('/:id', AuthController.verifyOga, mealController.deleteMeal);

export default router;