import Cuisine from '../model/cuisineModel.js';

// Create a new cuisine
export const createCuisine = async (req, res) => {
  try {
    const newCuisine = new Cuisine(req.body);
    const savedCuisine = await newCuisine.save();
    res.status(201).json(savedCuisine);
  } catch (error) {
    res.status(400).json({ error: 'Could not create cuisine', details: error.message });
  }
};

// Get all cuisines
export const getAllCuisines = async (req, res) => {
    try {
      const cuisines = await Cuisine.find();
      res.json(cuisines);
    } catch (error) {
      res.status(400).json({ error: 'Could not get cuisines', details: error.message });
    }
  };

export const updateCuisine = async (req, res) => {
  try {
    const updatedCuisine = await Cuisine.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedCuisine) {
      return res.status(404).json({ error: 'Cuisine not found' });
    }
    res.json(updatedCuisine);
  } catch (error) {
    res.status(400).json({ error: 'Could not update cuisine', details: error.message });
  }
};

// Delete a cuisine by ID
export const deleteCuisine = async (req, res) => {
  try {
    const deletedCuisine = await Cuisine.findByIdAndRemove(req.params.id);
    if (!deletedCuisine) {
      return res.status(404).json({ error: 'Cuisine not found' });
    }
    res.json({ message: 'Cuisine deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Could not delete cuisine', details: error.message });
  }
};
