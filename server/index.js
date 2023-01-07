import express from "express";
import cors from "cors";

import authRouter from "./routers/authRouter.js";
import placeRouter from "./routers/placeRouter.js";
import tagRouter from "./routers/tagRouter.js";
import "./config/db.js";


const app = express();
app.use(express.json());
app.use(cors());

app.listen(5000, () =>{
    console.log("Server is running on port 5000");
});


app.get("/", (request, response) => {
    return response.status(404).json({
        message: "Not found!",
    });
});

app.use("/users", authRouter);
app.use("/places", placeRouter);
app.use("/tags", tagRouter);

app.use("*", (request, response) => {
    return response.status(404).json({
        message: "Not found!",
    });
});
