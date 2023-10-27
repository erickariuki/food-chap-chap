import express from 'express';
import {
  createCuisine,
  getAllCuisines,
  updateCuisine,
  deleteCuisine,
} from '../controllers/cuisineController.js';

const cuisineRouter = express.Router();

// Create a new cuisine
cuisineRouter.post('/', createCuisine);

// Get all cuisines
cuisineRouter.get('/', getAllCuisines);

// Update a cuisine by ID
cuisineRouter.put('/:id', updateCuisine);

// Delete a cuisine by ID
cuisineRouter.delete('/:id', deleteCuisine);

export default cuisineRouter;
