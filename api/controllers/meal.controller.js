import mealService from '../services/meal.service'

const mealController = {
    fetchAllMeals(req, res) {
        const allMeals = mealService.fetchAllMeals();
        return res.json({
            status: "success",
            data: allMeals
        }).status(201);
    },

    addAMeal(req, res) {
        /**
         * expect json of format
         *  {
         * name: "name of food",
         * size: ".."
         * 
         * }
         */
        const newMeal = req.body;
        const createdMeal = mealService.addMeal(newMeal);
        return res.json({
            status: 'success',
            data: createdMeal
        }).status(201)
    },

    getSingleMeal(req, res) {
        const id = req.params.id;
        const foundMeal = mealService.getAMeal(id);
        return res.json({
            status: "success",
            data: foundMeal
        }).status(200);
    }
};

export default mealController;