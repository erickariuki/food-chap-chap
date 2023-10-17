import morgan from 'morgan';
import cors from 'cors';
import express from 'express';
import connect from './database/conn.js';
import router from './router/routes.js';
import passport from 'passport';
import crypto from 'crypto';
import session from 'express-session';
import cookieParser from "cookie-parser";
import userRouter from './router/userRoutes.js';
import postRouter from './router/postRoutes.js';

const app = express();

// Generate a random string of characters (128 characters long)
const secretKey = crypto.randomBytes(64).toString('hex');

// Use the generated key for your express-session configuration
app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: false,
}));

const corsOptions = {
  origin: 'http://localhost:4000', // Replace with the actual origin of your React app
  credentials: true, // Allow cookies to be included in cross-origin requests
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by");
app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());



const port = 8080

// HTTP GET Request 

app.get("/", (req, res) => {
    res.status(201).json("Home Get Request")
})


// API ROUTES
app.use("/api", router);
app.use("/api/users", userRouter)
app.use('/api/posts', postRouter),

app.get("/", (req, res) => {
  res.redirect("http://localhost:4000/auth/google"); // Redirect to Google authentication URL
});

app.listen(port, () => {
  console.log(`Server connected to http://localhost:${port}`);
});
