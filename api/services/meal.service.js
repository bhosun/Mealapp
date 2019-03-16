import Meal from '../models/meal.model';

const mealService = {
    fetchAllMeals() {
        return Meal.findAll()
    },

    addMeal(newMeal) {
        return Meal.create(newMeal);
    },

    getAMeal(id) {
        return Meal.findOne({
            where: {
                id: id
            }
        })
    },

    putAMeal(meal, id) {
        return Meal.update(
            {
                name: meal.name,
                imageurl: meal.imageurl
            },
            {
                where: {id: id}
            }
        )
    },

    removeMeal(id) {
        return Meal.destroy(
            {where: {id: id}}
        )
    }
}

export default mealService;