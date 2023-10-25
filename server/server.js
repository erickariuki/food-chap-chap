import express, { request, response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import restaurantRoutes from './router/restaurantRoutes.js';
import menuRoutes from './router/menuRoutes.js';
import orderRoutes from './router/orderRoutes.js';
import connect from './database/conn.js';
import router from './router/routes.js';
import morgan from 'morgan';
import passport from 'passport';
import pkg from 'passport';
import session from 'express-session';
import crypto from 'crypto';

// Create an Express application

// import mongoDBURL from './config.js';

import userRouter from './router/userRoutes.js';
import postRouter from './router/postRoutes.js';
import blogRouter from './router/blogRoutes.js';


const app = express();
const secretKey = crypto.randomBytes(32).toString('hex');
// Middleware for handling CORS
app.use(cors({ origin: 'http://localhost:4000' }));
app.use(
    cors({
        origin: 'http://localhost:8080', // Replace with your allowed origin
        methods: ['GET', 'POST', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);
app.use(cors());

// Middleware to parse JSON in request bodies
app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan("tiny"));
app.disable("x-powered-by");
app.set('view engine', 'ejs');


app.use(
    session({
        secret: secretKey,
        resave: false,
        saveUninitialized: true,
    })
);


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
app.use("/api", router);
app.use("/api/users", userRouter)
app.use('/api/posts', postRouter),
app.use('/api/blogs', blogRouter)

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

