import express from 'express';
// import dotenv from 'dotenv';
import cors from 'cors';
import stringsRouter from './routes/routes.js';


const app = express();

app.use(cors());
app.use(express.json());
app.use('/', stringsRouter);

// handle unknown routes
app.use((req,res)=>{
    res.status(404).json({
        status: "error",
        message: "Route not found. Try visiting /string for the profile endpoint."
    })
})

// global error handler
app.use((err, req, res, next) => {
  console.error("Internal Server Error:", err.stack);
  res.status(500).json({
    status: "error",
    message: "Something went wrong on the server. Please try again later."
  });
});

export default app;