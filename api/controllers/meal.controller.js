import mealService from '../services/meal.service'

const mealController = {
    fetchAllMeals(req, res) {
        const allMeals = mealService.fetchAllMeals();
        return res.status(200).json({
            status: "success",
            data: allMeals
        })
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

        if(!newMeal.name || !newMeal.price || !newMeal.size) {
            return res.status(400).json({
                status: 'error',
                data: ('Input the Parameters Rightly')
            });
        }

        const createdMeal = mealService.addMeal(newMeal);
        return res.status(201).json({
            status: 'success',
            data: createdMeal
        })
    },

    getSingleMeal(req, res) {
        const id = req.params.id;
        const foundMeal = mealService.getAMeal(id);

        if(Number.isNaN(Number(id))) {
            return res.status(400).json({
                status: "error",
                data: 'Your id is not a number! it must be a number'
            });
        } else {
            return res.status(200).json({
                status: "success",
                data: foundMeal
            })
        }
    },

    updateMeal(req, res) {
        const { id } = req.params;
        const mealy = req.body;

        if (Number.isNaN(Number(id))) {
            return res.status(400).json({
                message: 'Please make sure you input a Number'
            })
        }
        const yin = mealService.putAMeal(mealy, id);
        return res.status(201).json({
            status: "success",
            data: yin
        })
    },

    deleteMeal(req, res) {
        const id = req.params.id;
        const remove = mealService.removeMeal(id);

        if(remove == null) {
            return res.status(400).json({
                message: `cannot delete meal with id ${id} now`
            })
        }

        return res.status(200).json({
            status: "success",
            data: remove
        })
    }
};

export default mealController;