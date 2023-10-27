import Food from '../model/food.js';
// Create a new food item
 export const createFood = async (req, res) => {
  try {
    const { name, restaurant_id, cuisine_id, foodtype, quantity, description, price, image } = req.body;

    const newFood = new Food({
      name,
      restaurant_id,
      cuisine_id,
      foodtype,
      quantity,
      description,
      price,
      image,
    });

    const savedFood = await newFood.save();
    res.json(savedFood);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a list of all food items
export const getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a single food item by ID
export const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ error: 'Food not found' });
    }
    res.json(food);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a food item by ID
 export const updateFood = async (req, res) => {
  try {
    const updatedFood = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedFood) {
      return res.status(404).json({ error: 'Food not found' });
    }
    res.json(updatedFood);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a food item by ID
 export  const deleteFood = async (req, res) => {
  try {
    const deletedFood = await Food.findByIdAndRemove(req.params.id);
    if (!deletedFood) {
      return res.status(404).json({ error: 'Food not found' });
    }
    res.json(deletedFood);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// export default {
//   createFood,
//   getAllFoods,
//   getFoodById,
//   updateFood,
//   deleteFood,
// };
