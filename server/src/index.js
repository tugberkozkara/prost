const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const serverless = require("serverless-http");

const apiRouter = require("./routers/apiRouter");
const connect = require("./config/db");
connect.connect();

const app = express();
app.use(express.json());
app.use(cors());
app.use(apiRouter);

dotenv.config();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports.handler = serverless(app);
