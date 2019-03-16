import mealService from '../services/meal.service'
// import Meal from '../models/meal.model';

const mealController = {
    fetchAllMeals(req, res) {
        const allMeals = mealService.fetchAllMeals();
        return allMeals
            .then(meal => {
                res.status(200).json({
                status: "success",
                data: meal
                })
            })    
            .catch(err => console.log(err));    
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

        if(!newMeal.name || !newMeal.imageurl) {
            return res.status(400).json({
                status: 'error',
                data: ('Input the Parameters Rightly')
            });
        }

        const createdMeal = mealService.addMeal(newMeal);
        return createdMeal
            .then(meal => {
                res.status(201).json({
                status: 'success',
                data: meal
                })
            })
            .catch(err => console.log(err));
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
            return foundMeal
                .then(meal => { 
                    res.status(200).json({
                    status: "success",
                    data: foundMeal
                    })
                })
                .catch(err => console.log(err));
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
        return yin
            .then(
                res.status(201).json({
                status: "success",
                data: yin
                })
            )
            .catch(err => console.log(err));
    },

    deleteMeal(req, res) {
        const id = req.params.id;
        const remove = mealService.removeMeal(id);

        if(Number.isNaN(Number(id))) {
            return res.status(400).json({
                message: `cannot delete meal with id ${id} now`
            })
        }

        return remove
            .then(
                res.status(200).json({
                status: "success",
                data: remove
                })
            )
            .catch(err => console.log(err));    
    }
};

export default mealController;