import express from "express";
import authRouter from "./authRouter.js";
import placeRouter from "./placeRouter.js";
import tagRouter from "./tagRouter.js";
import locationRouter from "./locationRouter.js";

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

export default router;