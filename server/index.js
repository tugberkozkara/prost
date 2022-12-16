import express from 'express';
import cors from 'cors';

import userRouter from './routers/userRouter.js';
import placeRouter from './routers/placeRouter.js';
import './config/db.js';


const app = express();
app.use(express.json());
app.use(cors());

app.listen(5000, () =>{
    console.log(`Server is running on port 5000`);
});


app.get("/", (request, response) => {
    return response.status(404).json({
        message: "Not found!",
    })
});

app.use('*', (request, response) => {
    return response.status(404).json({
        message: "Not found!",
    })})

app.use('/users', userRouter);
app.use('/places', placeRouter);
