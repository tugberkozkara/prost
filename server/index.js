import express from "express";
import cors from "cors";
import https from "https";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import monitor from "express-status-monitor";

import apiRouter from "./routers/apiRouter.js";
import "./config/db.js";

const app = express();
app.use(monitor());
app.use(express.json());
app.use(cors());
app.use(apiRouter);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, "cert", "private.key")),
    cert: fs.readFileSync(path.join(__dirname, "cert", "certificate.crt")),
}, app);

sslServer.listen(8443, () => {
    console.log("HTTPS server is running on port 8443");
});

app.listen(5000, () => {
    console.log("HTTP server is running on port 5000");
});

