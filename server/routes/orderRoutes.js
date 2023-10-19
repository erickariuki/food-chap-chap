import express from 'express';
import Order from '../models/order.js';

const router = express.Router();

// GET all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
});

// POST a new order
router.post('/', async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        res.json(savedOrder);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
});

// PUT update an order
router.put('/:id', async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedOrder);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
});

// DELETE an order
router.delete('/:id', async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        res.json(deletedOrder);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
});

export default router;
