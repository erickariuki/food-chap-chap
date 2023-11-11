import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import crypto from 'crypto';
import morgan from 'morgan';
import passport from 'passport';
import restaurantRoutes from './router/restaurantRoutes.js';
import orderRoutes from './router/orderRoutes.js';
import connect from './database/conn.js';
import router from './router/routes.js';
import userRouter from './router/userRoutes.js';
import postRouter from './router/postRoutes.js';
import blogRouter from './router/blogRoutes.js';
import cuisineRouter from './router/cuisineRoutes.js';
import bookingRouter from './router/bookingRoute.js';
import foodRouter from './router/foodRoutes.js';

// Create an Express application
const app = express();

// Generate a random secret key for your sessions
const secretKey = crypto.randomBytes(32).toString('hex');

// Middleware for handling CORS (configure with your allowed origins)
const corsOptions = {
  origin: 'http://localhost:4000', // Replace with your frontend's origin
  credentials: true, // Allow cookies and credentials for cross-origin requests
};
app.use(cors(corsOptions));


// Middleware to parse JSON in request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('tiny'));
app.disable('x-powered-by');
app.set('view engine', 'ejs');

// Session middleware for Passport.js
app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Define your routes
app.use('/restaurants', restaurantRoutes);

app.use('/orders', orderRoutes);

// API Routes
app.use('/api', router);
app.use('/api/foods', foodRouter);
app.use('/api/user', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/blogs', blogRouter);
app.use('/api/cuisines', cuisineRouter);
app.use('/api/bookings', bookingRouter);

// Basic route for the root URL
app.get('/', (req, res) => {
  res.status(200).send('Welcome to your food store application');
});

// MongoDB connection and server start
const port = 8080;
connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server connected to http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(`Server not listening on http://localhost:${port}`);
    console.error(error);
  });
