import express, { request, response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import restaurantRoutes from './routes/restaurantRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import connect from './database/conn.js';
import router from './router/routes.js';
import morgan from 'morgan';
import passport from 'passport';
import pkg from 'passport';

// Create an Express application

const app = express();

// Middleware for handling CORS
app.use(
    cors({
        origin: 'http://localhost:8080', // Replace with your allowed origin
        methods: ['GET', 'POST', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);

// Middleware to parse JSON in request bodies
app.use(express.json());
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by");
app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());




const port = 8080
// start server only when mongodb connected



// Basic route for the root URL
app.get('/', (req, res) => {
    res.status(200).send('Welcome to your food store application');
});

// Define your routes
app.use('/restaurants', restaurantRoutes);
app.use('/menus', menuRoutes);
app.use('/orders', orderRoutes);

// API ROUTES
app.use("/api", router)

app.get("/", (req, res) => {
    res.render("/http://localhost:4000")
});


//Auth with google
app.get("/", (req, res) => {
    res.render("http://localhost:4000/auth/google");
});
connect().then(() => {
    try {
        app.listen(port,() => {
            console.log(` Server connected to http://localhost:${port}`);
        }) 
    }
    catch(error){
        console.log(` Server not listening on http://localhost:${port}`);
    }
});

