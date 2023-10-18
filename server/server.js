import morgan from 'morgan';
import cors from 'cors';
import express from 'express';
import connect from './database/conn.js';
import router from './router/routes.js';
// import app from 'express';
import passport from 'passport';
import pkg from 'passport';
 

 const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by");
app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());

const port = 8080

// HTTP GET Request 

app.get("/", (req, res) => {
    res.render("http://localhost:4000/auth/google");
})


// API ROUTES
app.use("/api", router)

app.get("/", (req, res) => {
    res.render("/http://localhost:4000")
});


// start server only when mongodb connected
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


