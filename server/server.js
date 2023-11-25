// server.js
import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import crypto from 'crypto';
import morgan from 'morgan';
import passport from 'passport';
import configurePassport from './config/passport-setup.js'; // Import the Passport configuration
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

const app = express();

const secretKey = crypto.randomBytes(32).toString('hex');

const corsOptions = {
  origin: 'http://localhost:4000',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('tiny'));
app.disable('x-powered-by');
app.set('view engine', 'ejs');

app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport
configurePassport();

app.use('/restaurants', restaurantRoutes);
app.use('/orders', orderRoutes);
app.use('/api', router);
app.use('/api/foods', foodRouter);
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/blogs', blogRouter);
app.use('/api/cuisines', cuisineRouter);
app.use('/api/bookings', bookingRouter);

app.get('/', (req, res) => {
  res.status(200).send('Welcome to your food store application');
});

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
