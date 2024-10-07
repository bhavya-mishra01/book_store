import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

import bookRouter from "./routes/bookRoute.js";
const app = express();

// middleware for parsing request body
app.use(express.json());


app.use('/books',bookRouter);

app.use(
    cors({
        origin:'http://localhost/3000',
        methods:['GET','POST','PUT','DELETE'],
        allowedHeaders:['Content-type']
    })
);

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("server running");
});


mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`app is listening: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });