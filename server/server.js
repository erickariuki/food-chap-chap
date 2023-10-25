import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import restaurantRoutes from './routes/restaurantRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import ReviewRoutes from './routes/ReviewRoutes.js';
import { PORT, mongoDBURL } from './config.js';

const app = express();

// JWT strategy setup
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'b3dd48274a9dc85b1679ddb7c40f11ba1a5de152a67642e661a33a1b6fb3d907',
};

passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.sub, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

// Middleware for handling CORS
app.use(
  cors({
    origin: 'http://localhost:5178',
    methods: ['GET', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);

// Middleware to parse JSON in request bodies
app.use(express.json());

// Initialize Passport
app.use(passport.initialize());

// Connect to MongoDB
mongoose
  .connect(mongoDBURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    // other options...
  })
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

// Define your routes here
app.use('/restaurants', restaurantRoutes);
app.use('/menus', menuRoutes);
app.use('/orders', orderRoutes);
app.use('/reviews', ReviewRoutes);

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
