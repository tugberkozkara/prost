import express from "express";
import bodyParser from "body-parser";
import LocationController from "../controllers/locationController.js";
import IDHandler from "../handlers/idHandler.js";

var router = express.Router();
var jsonParser = bodyParser.json();

router.get("/", LocationController.getAllLocations);
router.post("/", jsonParser, LocationController.createLocation);
router.delete("/:id", IDHandler.getIdHandler, LocationController.deleteLocationById);

export default router;
