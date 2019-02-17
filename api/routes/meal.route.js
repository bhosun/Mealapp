import { Router } from 'express';


import mealController from '../controllers/meal.controller';

const router = Router();

router.get('/', mealController.fetchAllMeals);
router.post('/', mealController.addAMeal);
router.get('/:id', mealController.getSingleMeal);
router.put('/:id', mealController.updateMeal);
router.delete('/:id', mealController.deleteMeal);

export default router;