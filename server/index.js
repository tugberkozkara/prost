import express from "express";
import cors from "cors";
import https from "https";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import authRouter from "./routers/authRouter.js";
import placeRouter from "./routers/placeRouter.js";
import tagRouter from "./routers/tagRouter.js";
import "./config/db.js";

const app = express();
app.use(express.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem")),
}, app);

sslServer.listen(5000, () => {
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
