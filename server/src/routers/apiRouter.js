const express = require("express");
const authRouter = require("./authRouter");
const placeRouter = require("./placeRouter");
const tagRouter = require("./tagRouter");
const locationRouter = require("./locationRouter");


var router = express.Router();

router.use("/auth", authRouter);
router.use("/places", placeRouter);
router.use("/tags", tagRouter);
router.use("/locations", locationRouter);

router.use("*", (request, response) => {
    return response.status(404).json({
        message: "Not found!",
    });
});

module.exports = router;
