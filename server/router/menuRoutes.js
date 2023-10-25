import express from 'express';
import Menu from '../model/menu.js';

const router = express.Router();

// GET all menus
router.get('/', async (request, response) => {
    try {
        const menus = await Menu.find();
        return response.status(200).json({
            count: menus.length,
            data: menus,
        });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// POST a new menu
router.post('/', async (request, response) => {
    try {
        if (!request.body.restaurant || !request.body.foodItems || !Array.isArray(request.body.foodItems)) {
            return response.status(400).send({
                message: 'Send a valid restaurant ID and an array of food items.',
            });
        }

        const newMenu = {
            restaurant: request.body.restaurant,
            foodItems: request.body.foodItems,
        };

        const menu = await Menu.create(newMenu);

        return response.status(201).json(menu);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// GET a menu by ID
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const menu = await Menu.findById(id);
        return response.status(200).json(menu);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// PUT update a menu
router.put('/:id', async (request, response) => {
    try {
        if (!request.body.foodItems || !Array.isArray(request.body.foodItems)) {
            return response.status(400).send({
                message: 'Send a valid array of food items to update the menu.',
            });
        }

        const { id } = request.params;
        const result = await Menu.findByIdAndUpdate(id, { foodItems: request.body.foodItems });

        if (!result) {
            return response.status(404).json({ message: 'Menu not found' });
        }

        return response.status(200).json({ message: 'Menu updated successfully' });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// DELETE a menu by ID
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Menu.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Menu not found' });
        }

        return response.status(200).json({ message: 'Menu deleted successfully' });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

export default router;
