import express from "express";
import bodyParser from "body-parser";
import LocationController from "../controllers/locationController.js";
import LocationHandler from "../handlers/locationHandler.js";

var router = express.Router();
var jsonParser = bodyParser.json();

router.get("/", LocationController.getAllLocations);
router.post("/", jsonParser, LocationController.createLocation);
router.delete("/:id", LocationHandler.getLocationHandler,LocationController.deleteLocationById);

export default router;
