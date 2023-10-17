import express from 'express';
import Restaurant from './models/restaurant';

const router = express.Router();

// GET all restaurants
router.get('/', async (request, response) => {
    try {
        const restaurants = await Restaurant.find();
        return response.status(200).json({
            count: restaurants.length,
            data: restaurants,
        });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// POST a new restaurant
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.name ||
            !request.body.location ||
            !request.body.contact ||
            !request.body.cuisine ||
            !request.body.openingHours ||
            !request.body.ratings
        ) {
            return response.status(400).send({
                message:
                    'Send all required fields: name, location, contact, cuisine, openingHours, ratings',
            });
        }

        const newRestaurant = {
            name: request.body.name,
            location: request.body.location,
            contact: request.body.contact,
            cuisine: request.body.cuisine,
            openingHours: request.body.openingHours,
            ratings: request.body.ratings,
        };

        const restaurant = await Restaurant.create(newRestaurant);

        return response.status(201).json(restaurant);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// GET a restaurant by ID
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const restaurant = await Restaurant.findById(id);
        return response.status(200).json(restaurant);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// PUT update a restaurant
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.name ||
            !request.body.location ||
            !request.body.contact ||
            !request.body.cuisine ||
            !request.body.openingHours ||
            !request.body.ratings
        ) {
            return response.status(400).send({
                message:
                    'Send all required fields: name, location, contact, cuisine, openingHours, ratings',
            });
        }

        const { id } = request.params;
        const result = await Restaurant.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: 'Restaurant not found' });
        }

        return response.status(200).json({ message: 'Restaurant updated successfully' });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// DELETE a restaurant by ID
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Restaurant.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Restaurant not found' });
        }

        return response.status(200).json({ message: 'Restaurant deleted successfully' });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

export default router;
