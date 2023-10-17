import morgan from 'morgan';
import cors from 'cors';
import express from 'express';
import connect from './database/conn.js';
import router from './router/routes.js';

// import mongoDBURL from './config.js';

import userRouter from './router/userRoutes.js';
import postRouter from './router/postRoutes.js';
import blogRouter from './router/blogRoutes.js';


const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by");



const port = 8080

// HTTP GET Request 

app.get("/", (req, res) => {
    res.status(201).json("Home Get Request")
})


// API ROUTES
app.use("/api", router);
app.use("/api/users", userRouter)
app.use('/api/posts', postRouter),
app.use('/api/blogs', blogRouter)


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


