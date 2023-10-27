import express from 'express';
import {
    createFood,
    getAllFoods,
    getFoodById,
    updateFood,
    deleteFood,
} from '../controllers/foodController.js'


const foodRouter = express.Router();
// Create a new food item
foodRouter.post('/create', createFood);

// Get a list of all food items
foodRouter.get('/',getAllFoods);

// Get a single food item by ID
foodRouter.get('/get/:id', getFoodById);

// Update a food item by ID
foodRouter.put('/update/:id', updateFood);

// Delete a food item by ID
foodRouter.delete('/delete/:id', deleteFood);

export default foodRouter;
