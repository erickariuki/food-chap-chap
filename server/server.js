import express, { request, response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import restaurantRoutes from './routes/restaurantRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { PORT, mongoDBURL } from './config.js'
// Create an Express application
const app = express();

// Middleware for handling CORS
app.use(
    cors({
        origin: 'http://localhost:5178', // Replace with your allowed origin
        methods: ['GET', 'POST', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);

// Middleware to parse JSON in request bodies
app.use(express.json());

// Connect to MongoDB
mongoose
    .connect(mongoDBURL, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB:', error);
    });

// Basic route for the root URL
app.get('/', (req, res) => {
    res.status(200).send('Welcome to your food store application');
});

// Define your routes
app.use('/restaurants', restaurantRoutes);
app.use('/menus', menuRoutes);
app.use('/orders', orderRoutes);

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
